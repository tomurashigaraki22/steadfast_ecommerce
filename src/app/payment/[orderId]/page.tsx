'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function PaymentPage({ params }: { params: { orderId: string } }) {
    const router = useRouter();
    const { getToken } = useAuth();
    const [isProcessing, setIsProcessing] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const processPayment = async () => {
            try {
                const headers: Record<string, string> = {
                    'Content-Type': 'application/json'
                };
                const token = getToken();
                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pay`, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({
                        order_id: params.orderId
                    })
                });

                if (!response.ok) {
                    throw new Error('Payment processing failed');
                }

                const data = await response.json();
                router.push(`/orders/${params.orderId}`);
            } catch (error) {
                setError('Failed to process payment. Please try again.');
                setIsProcessing(false);
            }
        };

        processPayment();
    }, [params.orderId]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {isProcessing ? (
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#184193] mx-auto"></div>
                        <h2 className="mt-6 text-center text-xl font-bold text-gray-900">
                            Processing your payment...
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Please do not close this window
                        </p>
                    </div>
                ) : (
                    <div className="text-center">
                        <div className="text-red-600 mb-4">{error}</div>
                        <button
                            onClick={() => {
                                setIsProcessing(true);
                                setError('');
                            }}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#184193] hover:bg-[#123472] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#184193]"
                        >
                            Try Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}