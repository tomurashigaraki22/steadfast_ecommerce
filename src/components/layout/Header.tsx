"use client"
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingBag, Heart, Menu, User, SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

export const Header = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <header className="bg-white shadow-sm">
            {/* Desktop Header */}
            <div className="hidden md:block">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex-shrink-0">
                            <Image src="/logo.png" alt="Steadfast" width={150} height={40} />
                        </Link>

                        <div className="flex-1 max-w-xl mx-8">
                            <form onSubmit={handleSearch} className="relative flex">
                                <div className="absolute flex flex-col h-full px-5 items-center justify-center">
                                    <SearchIcon className='w-4 h-4' />
                                </div>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search product, category"
                                    className="w-full pl-13 pr-24 py-2.5 border bg-[#F0F0F0] text-black placeholder:text-black border-gray-200 rounded-[2rem] focus:outline-none text-sm"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-0 top-0 h-full px-6 bg-[#184193] text-white rounded-r-[2rem] text-sm font-medium"
                                >
                                    Search
                                </button>
                            </form>
                        </div>

                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-2">
                                <User size={20} />
                                <Link href="/auth/login" className="text-sm font-semibold">Login / Register</Link>
                            </div>
                            <div className="flex items-center gap-4">
                                <Link href="/cart" className="relative  bg-[#EDF0F8] p-3 rounded-[50%]">
                                    <ShoppingBag size={20} strokeWidth={1.5} />
                                    <span className="absolute top-0 -right-2 border-2 border-white bg-[#184193] text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">0</span>
                                </Link>
                                <Link href="/wishlist" className="relative bg-[#EDF0F8] p-3 rounded-[50%]">
                                    <Heart size={20} strokeWidth={1.5} />
                                    <span className="absolute top-0 -right-2 border-2 border-white bg-[#184193] text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">0</span>
                                </Link>

                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-8 mt-4">
                        <div className="flex flex-row items-center justify-center gap-8 mt-4">
                            <div className="relative group">
                                <button className="flex items-center gap-2 text-sm py-3 px-4  border border-[#184193] rounded-[2rem]">
                                    All Categories
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>

                            <nav className="flex-1">
                                <ul className="flex gap-8">
                                    <li>
                                        <Link href="/products/category/chandeliers"
                                            className="text-sm py-1.5 px-4">
                                            Chandeliers
                                        </Link>
                                    </li>
                                    <li><Link href="/products/category/pop-spotlight" className="text-sm">POP Spotlight</Link></li>
                                    <li><Link href="/products/category/outdoor-light" className="text-sm">Outdoor Light</Link></li>
                                    <li><Link href="/products/category/rope-light" className="text-sm">Rope Light</Link></li>
                                    <li><Link href="/products/category/switch-socket" className="text-sm">Switch & Socket</Link></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Header */}
            <div className="md:hidden">
                <div className="flex items-center justify-between px-4 py-3">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                        <Menu size={24} />
                    </button>
                    <Link href="/" className="flex-shrink-0">
                        <Image src="/logo.png" alt="Steadfast" width={120} height={32} />
                    </Link>
                    <Link href="/cart" className="relative p-2">
                        <ShoppingBag size={24} />
                        <span className="absolute top-0 right-0 bg-[#184193] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                    </Link>
                </div>

                <div className="px-4 pb-3">
                    <form onSubmit={handleSearch} className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search a product, category"
                            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                            <Search size={20} />
                        </button>
                    </form>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="fixed inset-0 bg-white z-50">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-lg font-semibold">Menu</h2>
                            <button onClick={() => setIsMenuOpen(false)} className="p-2">
                                ✕
                            </button>
                        </div>
                        <nav className="p-4">
                            <ul className="space-y-4">
                                <li><Link href="/products/category/chandeliers" className="block py-2">Chandeliers</Link></li>
                                <li><Link href="/products/category/pop-spotlight" className="block py-2">POP Spotlight</Link></li>
                                <li><Link href="/products/category/outdoor-light" className="block py-2">Outdoor Light</Link></li>
                                <li><Link href="/products/category/rope-light" className="block py-2">Rope Light</Link></li>
                                <li><Link href="/products/category/switch-socket" className="block py-2">Switch & Socket</Link></li>
                            </ul>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};