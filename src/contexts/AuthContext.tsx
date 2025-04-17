'use client';

import Cookies from 'js-cookie';
import { createContext, useContext, useState, useEffect } from 'react';

import { User, LoginCredentials, AuthResponse, SignupCredentials, VerifyEmailCredentials } from '@/types/user';



interface AuthContextType {
    user: User | null;
    login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
    signup: (credentials: SignupCredentials) => Promise<{ success: boolean; error?: string }>;
    verifyEmail: (credentials: VerifyEmailCredentials) => Promise<{ success: boolean; error?: string }>;
    updateProfile: (profileData: Partial<User>) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
    changePassword: (passwords: { oldPassword: string; newPassword: string }) => Promise<{ success: boolean; error?: string }>;
    forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>; // <-- Add this
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            const savedUser = Cookies.get('user');
            console.log('Saved user:', savedUser); // Add this line to check the value of savedUser
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
                throw new Error((data as { error?: string }).error || 'Login failed');
            }

            // Store in cookies instead of localStorage
            Cookies.set('token', data.token, { expires: 70000 }); // Expires in 7 days
            Cookies.set('user', JSON.stringify(data.user), { expires: 70000 });
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

    const updateProfile = async (profileData: Partial<User>) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                },
                body: JSON.stringify(profileData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to update profile');
            }

            // Update local user state and cookie
            const updatedUser = { ...user, ...profileData };
            setUser(updatedUser as User);
            Cookies.set('user', JSON.stringify(updatedUser), { expires: 70000 });

            return { success: true };
        } catch (error: any) {
            return {
                success: false,
                error: error.message || 'Failed to update profile'
            };
        }
    };

    const changePassword = async (passwords: { oldPassword: string; newPassword: string }) => {
        try {
            const cookieUser = Cookies.get('user');
            const userData = cookieUser ? JSON.parse(cookieUser) : null;

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/change-password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                },
                body: JSON.stringify({
                    email: userData?.email,
                    old_password: passwords.oldPassword,
                    new_password: passwords.newPassword
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to update password');
            }

            return { success: true };
        } catch (error: any) {
            return {
                success: false,
                error: error.message || 'Failed to update password'
            };
        }
    };

    const forgotPassword = async (email: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send reset email');
            }

            return { success: true };
        } catch (error: any) {
            return {
                success: false,
                error: error.message || 'Failed to send reset email'
            };
        }
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            login, 
            signup,
            verifyEmail,
            updateProfile, // Add this
            logout, 
            changePassword,
            forgotPassword, // <-- Add this
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