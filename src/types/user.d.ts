export interface User {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    username: string;
    phone_number?: string;
    is_verified: boolean;
    address?: string;
    city?: string;
    state?: string;
}

export interface Product {
    productId: string;
    title: string;
    brand: string;
    price: number;
    rating: number | null;  // Updated to handle null ratings
    image: string;
    isNew?: boolean;
    category: string;
    dateCreated: string;
    dateUpdated: string;
    categoryId: string;
    stock: number;
    totalSold: number;
    discount?: {
        amount: number;
        percentage: number;
    };
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignupCredentials {
    first_name: string;
    last_name: string;
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