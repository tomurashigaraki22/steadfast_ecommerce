'use client';

import { useState } from 'react';
import { AuthWrapper } from '@/components/auth/AuthWrapper';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const router = useRouter();
    const { forgotPassword } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const result = await forgotPassword(email);
            if (result.success) {
                setSuccess('Password reset OTP has been sent to your email.');
                // Optionally, redirect after a delay
                setTimeout(() => {
                    router.push('/auth/reset-password');
                }, 2000);
            } else {
                setError(result.error || 'Failed to send reset email');
            }
        } catch (error: any) {
            setError(error.message || 'Failed to send reset email');
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
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <Button type="submit" isLoading={isLoading}>
                    Get Reset Link
                </Button>

                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-600 text-center">{success}</p>}

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