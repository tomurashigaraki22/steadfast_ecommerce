'use client';

import Cookies from 'js-cookie';
import { createContext, useContext, useState, useEffect } from 'react';

import { User, LoginCredentials, AuthResponse, SignupCredentials, VerifyEmailCredentials } from '@/types/user';
;


interface AuthContextType {
    user: User | null;
    login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
    signup: (credentials: SignupCredentials) => Promise<{ success: boolean; error?: string }>;
    verifyEmail: (credentials: VerifyEmailCredentials) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            const savedUser = Cookies.get('user');
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
        } catch (error) {
            console.error('Error loading user:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const login = async (credentials: LoginCredentials) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });

            const data: AuthResponse = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }

            // Store in cookies instead of localStorage
            Cookies.set('token', data.token, { expires: 7 }); // Expires in 7 days
            Cookies.set('user', JSON.stringify(data.user), { expires: 7 });
            setUser(data.user);

            return { success: true };
        } catch (error: any) {
            return { 
                success: false, 
                error: error.message || 'Login failed' 
            };
        }
    };

    const logout = () => {
        setUser(null);
        Cookies.remove('token');
        Cookies.remove('user');
    };

    const signup = async (credentials: SignupCredentials) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Signup failed');
            }

            return { success: true };
        } catch (error: any) {
            return {
                success: false,
                error: error.message || 'Signup failed'
            };
        }
    };

    const verifyEmail = async (credentials: VerifyEmailCredentials) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Verification failed');
            }

            return { success: true };
        } catch (error: any) {
            return {
                success: false,
                error: error.message || 'Verification failed'
            };
        }
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            login, 
            signup,
            verifyEmail,
            logout, 
            isAuthenticated: !!user,
            isLoading 
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};