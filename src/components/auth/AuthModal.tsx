'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { SocialButton } from '@/components/auth/SocialButton';
import { Modal } from '@/components/ui/Modal';
import Link from 'next/link';

interface AuthModalProps {
    isOpen: boolean;
    onClose: (isSuccessful?: boolean) => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
 
     useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

         return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            setShowSuccessModal(true);
            setTimeout(() => {
                onClose(true);
            }, 2000);
        } catch (error) {
            console.error('Auth failed:', error);
            onClose(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className={`fixed inset-0 z-[100] ${isOpen ? 'block' : 'hidden'}`}
        >
            <div className="fixed inset-0 bg-black/50 touch-none z-[101]" onClick={() => onClose(false)} />
            <div className="fixed inset-x-0 bottom-0 top-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:w-[480px] bg-white md:rounded-2xl md:max-h-[80vh] h-full md:h-auto overflow-y-auto z-[102]">
                <div className="p-6 md:p-8">
                    <button
                        onClick={() => onClose(false)}
                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                    >
                        <X size={24} />
                    </button>

                    <div className="text-center mb-8">
                        <h2 className="text-base md:text-lg font-semibold mb-2">
                            {isLogin ? "Log in to your account" : "Create Account"}
                        </h2>
                        <p className="text-sm md:text-base text-gray-600">
                            {isLogin
                                ? "Sign into your user account to continue ✨"
                                : "Sign up to enjoy a seamless experience 👋"}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {!isLogin && (
                            <>
                                <Input
                                    label="First Name"
                                    type="text"
                                    placeholder="Jessica"
                                    required
                                />
                                <Input
                                    label="Last Name"
                                    type="text"
                                    placeholder="Jackson"
                                    required
                                />
                                <Input
                                    label="Phone Number"
                                    type="tel"
                                    placeholder="+234"
                                    required
                                />
                            </>
                        )}
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="jess@mail.com"
                            required
                        />
                        <Input
                            label="Password"
                            type="password"
                            required
                            isPassword={true}
                        />

                        {isLogin && (
                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input type="checkbox" className="h-4 w-4 text-blue-600" />
                                    <span className="ml-2 text-xs text-gray-600">Remember Me</span>
                                </label>
                                <Link
                                    href="/auth/forgot-password"
                                    className="text-xs text-blue-600 hover:text-blue-500"
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                        )}

                        <Button type="submit" isLoading={isLoading} className="w-full">
                            {isLogin ? "Sign in →" : "Create Account"}
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
                            <SocialButton provider="google" label={`Sign ${isLogin ? 'in' : 'up'} with Google`} />
                            <SocialButton provider="facebook" label={`Sign ${isLogin ? 'in' : 'up'} with Facebook`} />
                            <SocialButton provider="apple" label={`Sign ${isLogin ? 'in' : 'up'} with Apple`} />
                        </div>

                        <p className="text-center text-sm text-gray-600">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button
                                type="button"
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-blue-600 text-sm hover:text-blue-500"
                            >
                                {isLogin ? "Create an account" : "Sign in"}
                            </button>
                        </p>
                    </form>
                </div>
                <Modal
                    isOpen={showSuccessModal}
                    onClose={() => setShowSuccessModal(false)}
                    type="success"
                    title={isLogin ? "Authentication Successful" : "Account Created!"}
                    message={isLogin
                        ? "Verifying your credentials..."
                        : "Your account has been created successfully. Redirecting to verification..."}
                    autoClose
                    autoCloseTime={2000}
                />
            </div>


        </div>
    );
};