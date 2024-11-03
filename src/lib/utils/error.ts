export interface PayloadErrorResponse {
	data?: {
		collection: string;
		errors?: { field: string; message: string }[];
	};
	status: number;
	name: string;
}

export function isPayloadErrorResponse(obj: unknown): obj is PayloadErrorResponse {
	if (typeof obj !== 'object' || obj === null) {
		return false;
	}

	const errorObj = obj as PayloadErrorResponse;

	// Check for required properties
	if (typeof errorObj.status !== 'number' || typeof errorObj.name !== 'string') {
		return false;
	}

	// Check data property if it exists
	if (errorObj.data !== undefined) {
		if (typeof errorObj.data !== 'object' || errorObj.data === null) {
			return false;
		}

		if (typeof errorObj.data.collection !== 'string') {
			return false;
		}

		// Check errors array if it exists
		if (errorObj.data.errors !== undefined) {
			if (!Array.isArray(errorObj.data.errors)) {
				return false;
			}

			for (const error of errorObj.data.errors) {
				if (typeof error !== 'object' || error === null) {
					return false;
				}
				if (typeof error.field !== 'string' || typeof error.message !== 'string') {
					return false;
				}
			}
		}
	}

	return true;
}
