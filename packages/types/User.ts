export interface User {
	id: number;
	username: string;
	email: string;
	provider: string;
	confirmed: boolean;
	blocked: boolean;
	createdAt: Date;
	updatedAt: Date;
	whatsapp: null | string;
}
