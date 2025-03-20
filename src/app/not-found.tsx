import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="text-center space-y-6 max-w-md">
                <div className="space-y-2">
                    <Image
                        src="/logo.png"
                        alt="Steadfast International"
                        width={150}
                        height={40}
                        className="mx-auto"
                    />
                    <h1 className="text-6xl font-bold text-gray-900">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-800">Page Not Found</h2>
                    <p className="text-gray-600 mt-4">
                        Oops! The page you&lsquo;re looking for doesn&lsquo;t exist or has been moved.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <Link href="/" className="inline-block">
                        <Button className="w-full">
                            Go to Homepage
                        </Button>
                    </Link>
                    <Link href="/auth/login" className="inline-block">
                        <Button variant="outline" className="w-full">
                            Sign In
                        </Button>
                    </Link>
                </div>

                <p className="text-sm text-gray-500 mt-8">
                    Need help? <Link href="/contact" className="text-blue-600 hover:text-blue-500">Contact Support</Link>
                </p>
            </div>
        </div>
    );
}