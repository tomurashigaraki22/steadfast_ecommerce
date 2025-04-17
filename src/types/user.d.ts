export interface User {
    id: string;
    email: string;
    username: string;
    phone_number?: string;
    is_verified: boolean;
    address?: string;   
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignupCredentials {
    username: string;
    email: string;
    password: string;
    phone_number: string;
}

export interface VerifyEmailCredentials {
    email: string;
    otp: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}