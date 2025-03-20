'use client';

import { useState } from 'react';
import { AuthWrapper } from '@/components/auth/AuthWrapper';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // TODO: Add password reset request logic
            router.push('/auth/reset-password');
        } catch (error) {
            console.error('Reset request failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthWrapper
            title="Reset Account Password 🔒"
            subtitle="Enter your email address"
        >
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <Input
                    label="Email Address"
                    type="email"
                    placeholder="jess@mail.com"
                    required
                />

                <Button type="submit" isLoading={isLoading}>
                    Get Reset Link
                </Button>

                <p className="text-center text-sm">
                    Remember Now?{' '}
                    <Link href="/auth/login" className="text-blue-600 hover:text-blue-500">
                        Sign In
                    </Link>
                </p>
            </form>
        </AuthWrapper>
    );
}