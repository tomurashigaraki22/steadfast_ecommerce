'use client';

import { useState } from 'react';
import { AuthWrapper } from '@/components/auth/AuthWrapper';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
 
export default function VerifyEmailPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // TODO: Add verification logic here
        } catch (error) {
            console.error('Verification failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendCode = async () => {
        try {
            // TODO: Add resend code logic here
        } catch (error) {
            console.error('Resend failed:', error);
        }
    };

    return (
        <AuthWrapper
            title="Verify Email Address"
            // subtitle="Enter Code"
        >
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <Input
                    label="Enter Code"
                    type="text"
                    placeholder="Enter 6 digit code sent to your email"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                />

                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Didn&lsquo;t get code?</span>
                    <button
                        type="button"
                        onClick={handleResendCode}
                        className="text-blue-600 hover:text-blue-500"
                    >
                        Resend Code
                    </button>
                </div>

                <Button type="submit" isLoading={isLoading}>
                    Confirm Code
                </Button>
            </form>
        </AuthWrapper>
    );
}