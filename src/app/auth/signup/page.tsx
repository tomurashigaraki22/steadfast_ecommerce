'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Modal } from '@/components/ui/Modal';
import { AuthWrapper } from '@/components/auth/AuthWrapper';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { SocialButton } from '@/components/auth/SocialButton';
import Link from 'next/link';
import { Check, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { BASE_URL } from '../../../../config';

interface PasswordRequirement {
    label: string;
    isValid: boolean;
}

export default function SignupPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [passwordRequirements, setPasswordRequirements] = useState<PasswordRequirement[]>([
        { label: 'Minimum 8 characters', isValid: false },
        { label: 'One lowercase character', isValid: false },
        { label: 'One uppercase character', isValid: false },
        { label: 'One number', isValid: false },
        { label: 'One special character', isValid: false },
    ]);

    const validatePassword = (value: string) => {
        setPassword(value);
        setPasswordRequirements([
            { label: 'Minimum 8 characters', isValid: value.length >= 8 },
            { label: 'One lowercase character', isValid: /[a-z]/.test(value) },
            { label: 'One uppercase character', isValid: /[A-Z]/.test(value) },
            { label: 'One number', isValid: /[0-9]/.test(value) },
            { label: 'One special character', isValid: /[!@#$%^&*(),.?":{}|<>]/.test(value) },
        ]);
    };

    const router = useRouter();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        const form = e.target as HTMLFormElement;
        const formData = {
            username: `${form.firstName.value} ${form.lastName.value}`,
            email: form.email.value,
            password: password,
            phone_number: form.phoneNumber.value
        };

        try {
            const response = await fetch(`${BASE_URL}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            // Store token
            localStorage.setItem('token', data.token);
            // Use context to store user data

            setShowSuccessModal(true);
            
            setTimeout(() => {
                router.push(`/auth/verify-email?email=${formData.email}&user=${data.user}`);
            }, 2000);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthWrapper
            title="Create Account"
            subtitle="Sign up to enjoy a seamless experience 👋"
        >
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <Input
                    label="First Name"
                    type="text"
                    placeholder="Jessica"
                    name='firstName'
                    required
                />
                <Input
                    label="Last Name"
                    type="text"
                    placeholder="Jackson"
                    name='lastName'
                    required
                />
                <Input
                    label="Email Address"
                    type="email"
                    placeholder="dom@mail.com"
                    required
                    name='email'
                />
                <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="+234"
                    name='phoneNumber'
                    required
                />
                <div className="space-y-2">
                    <Input
                        label="Password"
                        type="password"
                        isPassword
                        value={password}
                        onChange={(e) => validatePassword(e.target.value)}
                        required
                        name='password'
                    />
                    <div className="space-y-2 mt-2">
                        {passwordRequirements.map((req, index) => (
                            <div key={index} className="flex items-center text-sm">
                                {req.isValid ? (
                                    <Check className="w-4 h-4 text-green-500 mr-2" />
                                ) : (
                                    <X className="w-4 h-4 text-red-500 mr-2" />
                                )}
                                <span className={req.isValid ? 'text-green-700' : 'text-red-700'}>
                                    {req.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <Button type="submit" isLoading={isLoading}>
                    Create an Account
                </Button>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">OR</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <SocialButton provider="google" label="Sign up with Google" />
                    <SocialButton provider="facebook" label="Sign up with Facebook" />
                    <SocialButton provider="apple" label="Sign up with Apple" />
                </div>

                <p className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link href="/auth/login" className="text-blue-600 hover:text-blue-500">
                        Sign in
                    </Link>
                </p>
            </form>

            <Modal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                type="success"
                title="Account Created!"
                message="Your account has been created successfully. Redirecting to verification..."
                autoClose
                autoCloseTime={2000}
            />
        </AuthWrapper>
    );
}