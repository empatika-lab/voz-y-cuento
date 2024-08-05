export interface ServerActionSuccessResponse<Data> {
	success: true;
	data: Data;
}

export interface ServerActionErrorResponse {
	success: false;
	error: string;
}

export type ServerActionResponse<Data> =
	| ServerActionSuccessResponse<Data>
	| ServerActionErrorResponse;
