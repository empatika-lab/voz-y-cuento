export interface FetchWrapperProps {
	endpoint: string;
	config?: RequestInit;
	queryParams?: Record<string, string>;
}

/**
 * Fetches data from the Strapi API
 * @template Data - The expected response data type.
 * @param {FetchWrapperProps} props - The fetch options.
 * @returns {Promise<{ data: Data; success: true } | { error: ErrorResponse; success: false }>} - A promise that resolves to the API response.
 */
export async function restApi<Data>({
	endpoint,
	config,
	queryParams,
}: FetchWrapperProps): Promise<
	{ data: Data; success: true } | { error: string | Error; success: false }
> {
	try {
		const headers: RequestInit['headers'] = {
			'Content-type': 'application/json',
		};

		const url = new URL(`${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/${endpoint}`);

		if (queryParams) {
			Object.entries(queryParams).forEach(([key, value]) => {
				url.searchParams.append(key, value);
			});
		}

		const jsonResponse = await fetch(url.toString(), {
			...config,
			credentials: 'include',
			headers,
		});

		const result = await jsonResponse.json();

		if ('errors' in result) {
			return {
				success: false,
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				error: result.error,
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
				name: 'Fetch Error',
				message: 'Please check your internet connection or try again later.',
			},
		};
	}
}
