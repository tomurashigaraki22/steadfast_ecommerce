import Link from 'next/link';
import Image from 'next/image';
import { TopBanner } from '@/components/layout/TopBanner';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

interface ProfileLayoutProps {
    children: React.ReactNode;
}

export function ProfileLayout({ children }: ProfileLayoutProps) {
    return (
        <>
            <TopBanner theme="dark" />
            <Header />
            <main className="min-h-screen bg-[#FAFBFF]">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left Column - Navigation */}
                        <div className="lg:w-64 space-y-2">
                            <div className="bg-white rounded-xl p-4">
                                <Image
                                    src="/logo.png"
                                    alt="Steadfast International"
                                    width={150}
                                    height={40}
                                    className="mb-6"
                                />
                                <nav className="space-y-2">
                                    <Link href="/profile" className="block text-sm text-gray-600 hover:text-blue-600">
                                        Personal Information
                                    </Link>
                                    <Link href="/profile/shipping" className="block text-sm text-gray-600 hover:text-blue-600">
                                        Shipping Address
                                    </Link>
                                    <Link href="/profile/orders" className="block text-sm text-gray-600 hover:text-blue-600">
                                        Order History
                                    </Link>
                                    <Link href="/profile/notifications" className="block text-sm text-gray-600 hover:text-blue-600">
                                        Notification
                                    </Link>
                                    <Link href="/profile/security" className="block text-sm text-gray-600 hover:text-blue-600">
                                        Security
                                    </Link>
                                    <Link href="/logout" className="block text-sm text-gray-600 hover:text-blue-600">
                                        Logout
                                    </Link>
                                </nav>
                            </div>
                        </div>

                        {/* Right Column - Content */}
                        <div className="flex-1">
                            {children}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}