export interface authContextObj {
	token: string;
	isLoggedIn: boolean;
	login: (token: string, expirationTime: any) => void;
	logout: () => void;
}
