import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SearchIcon } from 'lucide-react';
import { TopBanner } from '@/components/layout/TopBanner';

export default function NotFound() {
    return (
        <>
            <TopBanner theme='dark' />
            <Header />
            <div className="px-[2rem] py-[2rem]">
                <div className="">
                    <div className="container mx-auto px-[2rem] py-[2rem]  bg-gradient-to-tr rounded-[1rem] from-[#E2DAEC] to-[#E4EEFD]">
                        <div className="flex p-5 md:p-[2rem] flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
                            <div className="flex-1 space-y-6 md:px-[5rem]  h-full">
                                <h1 className="text-2xl md:text-3xl font-medium text-gray-900">We lost that page...</h1>
                                <p className="text-gray-600">
                                    The page you are looking for was moved, removed<br />
                                    or might never existed. Here some helpful links:
                                </p>

                                <div className="relative  max-w-sm">
                                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                        <SearchIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="What are you looking for..."
                                        className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-[#CAD0D9] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                    />
                                </div>
                            </div>

                            <div className="flex-1 flex justify-center  lg:justify-end relative h-[30rem] w-full">
                                <Image
                                    src="/404.png"
                                    alt="404 Illustration"
                                    fill
                                    priority
                                    className="object-contain "
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
                        <Link
                            href="/"
                            className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow"
                        >
                            <h3 className="font-medium mb-1">Go to homepage</h3>
                            <p className="text-sm text-gray-600">Continue shopping from the homepage</p>
                        </Link>
                        <Link
                            href="/products"
                            className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow"
                        >
                            <h3 className="font-medium mb-1">Product Category</h3>
                            <p className="text-sm text-gray-600">Check out the trending products</p>
                        </Link>
                        <Link
                            href="/products/new"
                            className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow"
                        >
                            <h3 className="font-medium mb-1">New Arrivals</h3>
                            <p className="text-sm text-gray-600">Explore our new arrivals</p>
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}