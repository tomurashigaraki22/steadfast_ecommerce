'use client';

import { useState } from 'react';
import { AuthWrapper } from '@/components/auth/AuthWrapper';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { SocialButton } from '@/components/auth/SocialButton';

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <AuthWrapper
            title="Log in to your account"
            subtitle="Sign into your user account to continue ✨"
        >
            <form className="mt-8 space-y-6">
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

                <div className="flex items-center justify-between">
                    <label className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-blue-600" />
                        <span className="ml-2 text-xs text-gray-600">Remember Me</span>
                    </label>
                    <a href="#" className="text-xs text-blue-600 hover:text-blue-500">
                        Forgot Password?
                    </a>
                </div>

                <Button type="submit" isLoading={isLoading}>
                    Sign in →
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
                    <SocialButton provider="google" label="Sign in with Google" />
                    <SocialButton provider="facebook" label="Sign in with Facebook" />
                    <SocialButton provider="apple" label="Sign in with Apple" />
                </div>

                <p className="text-center text-xs text-gray-600">
                    Don't have an account?{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-500">
                        Create an account
                    </a>
                </p>
            </form>
        </AuthWrapper>
    );
}