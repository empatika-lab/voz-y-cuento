export interface PayloadErrorResponse {
	data?: {
		collection: string;
		errors?: { field: string; message: string }[];
	};
	status: number;
	name: string;
}
