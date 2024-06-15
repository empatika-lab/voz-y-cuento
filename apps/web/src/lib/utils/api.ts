/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface FetchWrapperProps {
	endpoint: string;
	config?: RequestInit;
	queryParams?: Record<string, string>;
	token?: string;
	role?: 'public' | 'private' | 'admin';
}

export interface StrapiErrorResponse {
	status: number;
	name: string;
	message: string;
	details: Record<string, unknown>;
}

export interface ErrorResponse {
	status?: number;
	name?: string;
	message: string;
	details?: Record<string, unknown>;
}

/**
 * Type guard for checking if the response is a success response.
 * @template Data - The expected response data type.
 * @param {unknown} response - The response to check.
 * @returns {response is { data: Data; success: true }} - True if the response is a success response.
 */
export function isSuccessResponse<Data>(
	response: unknown,
): response is { data: Data; success: true } {
	return (
		typeof response === 'object' &&
		response !== null &&
		'success' in response &&
		response.success === true &&
		'data' in response
	);
}

/**
 * Type guard for checking if the response is an error response.
 * @param {unknown} response - The response to check.
 * @returns {response is { error: ErrorResponse; success: false }} - True if the response is an error response.
 */
export function isErrorResponse(
	response: unknown,
): response is { error: ErrorResponse; success: false } {
	return (
		typeof response === 'object' &&
		response !== null &&
		'success' in response &&
		(response as any).success === false &&
		'error' in response &&
		typeof (response as any).error === 'object' &&
		(response as any).error !== null &&
		'message' in (response as any).error
	);
}

/**
 * Fetches data from the Strapi API
 * @template Data - The expected response data type.
 * @param {FetchWrapperProps} props - The fetch options.
 * @returns {Promise<{ data: Data; success: true } | { error: ErrorResponse; success: false }>} - A promise that resolves to the API response.
 */
export default async function fetchApi<Data>({
	endpoint,
	config,
	token,
	queryParams,
	role = 'private',
}: FetchWrapperProps): Promise<
	| { data: Data; success: true }
	| { error: ErrorResponse | Error; success: false }
> {
	try {
		let headers: RequestInit['headers'] = {
			'Content-type': 'application/json',
		};

		if (role === 'private') {
			if (!token) {
				throw new Error('Bearer token not provided.');
			}
			headers = { ...headers, Authorization: `earer ${token}` };
		}

		if (role === 'admin') {
			const adminToken = process.env.ADMIN_API_TOKEN;
			if (!adminToken) {
				throw new Error('No admin token available..');
			}
			headers = { ...headers, Authorization: `bearer ${adminToken}` };
		}
		const url = new URL(`${process.env.STRAPI_API_URL}/api${endpoint}`);

		if (queryParams) {
			Object.entries(queryParams).forEach(([key, value]) => {
				url.searchParams.append(key, value);
			});
		}

		const jsonResponse = await fetch(url.toString(), {
			...config,
			headers,
		});

		const result = await jsonResponse.json();

		if ('error' in result) {
			return {
				success: false,
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				error: result.error as StrapiErrorResponse | Error,
			};
		}

		return {
			success: true,
			data: result as Data,
		};
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(JSON.stringify(error, null, 4));

		return {
			success: false,
			error: {
				status: -1,
				name: 'Fetch Error',
				message: 'Please check your internet connection or try again later.',
				details: {},
			},
		};
	}
}
