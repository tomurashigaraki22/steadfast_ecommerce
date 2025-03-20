'use client';

import { useState } from 'react';
import { AuthWrapper } from '@/components/auth/AuthWrapper';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';

export default function WelcomeBackPage() {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <AuthWrapper>
            <div className="space-y-8">
                <div className="text-center space-y-3">
                    <Image
                        src="/avatar.png"
                        alt="User Avatar"
                        width={80}
                        height={80}
                        className="mx-auto rounded-full border-4 border-white shadow-lg"
                    />
                    <h1 className="text-xl font-semibold">
                        Welcome Back, Jessica! 👋
                    </h1>
                </div>

                <form className="space-y-6 ">
                    <div className="relative">
                        <Input
                            type={"password"}
                            placeholder="Enter your password"
                            className="pr-12"
                            isPassword={true}
                        />

                    </div>

                    <Button type="submit" isLoading={isLoading}>
                        Sign in →
                    </Button>

                    <div className="text-center">
                        <Link
                            href="/auth/forgot-password"
                            className="text-sm text-blue-600 hover:text-blue-500"
                        >
                            Forgot Your Password?
                        </Link>
                    </div>
                </form>
            </div>
        </AuthWrapper>
    );
}