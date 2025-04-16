'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthWrapper } from '@/components/auth/AuthWrapper';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useAuth } from '@/contexts/AuthContext';
import { BASE_URL } from '../../../../config';

export default function VerifyEmailPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<'success' | 'error'>('success');
    const [modalMessage, setModalMessage] = useState('');
    const router = useRouter();

    
    const searchParams = useSearchParams();
    const email = searchParams.get('email')
    const { login } = useAuth();
    const userParam = searchParams.get('user');
    const userData = userParam ? JSON.parse(decodeURIComponent(userParam)) : null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(`${BASE_URL}/api/auth/verify-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    otp: code
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setModalType('error');
                setModalMessage(data.error || 'Verification failed');
                setShowModal(true);
                throw new Error(data.error || 'Verification failed');
            }

            // If verification successful and we have user data
            if (userData) {
                // Store token if it exists in the response
                if (data.token) {
                    localStorage.setItem('token', data.token);
                }
                
                // Login the user with the data we have
                login(userData);
            }

            setModalType('success');
            setModalMessage('Email verified successfully! Redirecting to dashboard...');
            setShowModal(true);
            
            setTimeout(() => {
                router.push('/dashboard');
            }, 2000);
        } catch (error: any) {
            console.error('Verification failed:', error);
            setModalType('error');
            setModalMessage(error.message);
            setShowModal(true);
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

            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                type={modalType}
                title={modalType === 'success' ? 'Verification Successful!' : 'Verification Failed'}
                message={modalMessage}
                autoClose={modalType === 'success'}
                autoCloseTime={2000}
            />
        </AuthWrapper>
    );
}