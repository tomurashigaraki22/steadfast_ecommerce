'use client';

import { useState } from 'react';
import { AuthWrapper } from '@/components/auth/AuthWrapper';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // TODO: Add password reset logic
            setShowSuccess(true);
            setTimeout(() => {
                router.push('/auth/login');
            }, 2000);
        } catch (error) {
            console.error('Password reset failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Alert
                message="Password changed successfully"
                isVisible={showSuccess}
                type='success'
            />
            <AuthWrapper
                title="Update Password"
                subtitle="Update your account password to continue"
            >
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <Input
                        label="Password"
                        type="password"
                        isPassword
                        required
                    />
                    <Input
                        label="Confirm Password"
                        type="password"
                        isPassword
                        required
                    />

                    <Button type="submit" isLoading={isLoading}>
                        Update Password
                    </Button>
                </form>
            </AuthWrapper>
        </>
    );
}