"use client"
import { Suspense } from 'react';
import { useState, useRef, useEffect } from 'react';
 import Link from 'next/link';
import Image from 'next/image';
import {  Menu, SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { categories } from '@/data/demo';
import { FavoritesHelper } from '@/lib/favorites';
import { CartPanel } from '@/components/cart/CartPanel';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronDown, LogOut, User, ShoppingBag, Heart } from 'lucide-react';

const SearchComponent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
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
    );
};


export const Header = () => {
    // Add new state
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const [wishlistCount, setWishlistCount] = useState(0);

    useEffect(() => {
        const favorites = FavoritesHelper.getAllFavorites();
        setWishlistCount(favorites.length);
    }, []);


    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    const { user, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        console.log("USERS: ", user)

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="bg-white shadow-sm">
            <div className="hidden md:block">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex-shrink-0">
                            <Image src="/logo.png" alt="Steadfast" width={150} height={40} />
                        </Link>

                        <div className="flex-1 max-w-xl mx-8">
                            <Suspense fallback={
                                <div className="w-full h-10 bg-gray-100 animate-pulse rounded-[2rem]" />
                            }>
                                <SearchComponent />
                            </Suspense>
                        </div>

                        <div className="flex items-center gap-8">
                            <div className="relative" ref={dropdownRef}>
                                {user ? (
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            className="flex items-center gap-2 text-sm font-semibold hover:text-[#184193] relative z-10"
                                        >
                                            <User size={20} />
                                            <span>{user.firstName}</span>
                                            <ChevronDown size={16} />
                                        </button>

                                        {isDropdownOpen && (
                                            <div className="absolute right-1/2 translate-x-1/2 mt-5 top-full   w-56 bg-white rounded-lg shadow-xl py-3 z-20 border border-gray-100">
                                               
                                                <div className="py-2">
                                                    <Link
                                                        href="/profile"
                                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                                                        onClick={() => setIsDropdownOpen(false)}
                                                    >
                                                        <User size={16} />
                                                        Profile
                                                    </Link>
                                                    <Link
                                                        href="/orders"
                                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                                                        onClick={() => setIsDropdownOpen(false)}
                                                    >
                                                        <ShoppingBag size={16} />
                                                        Orders
                                                    </Link>
                                                </div>
                                                <div className="border-t border-gray-100 pt-2">
                                                    <button
                                                        onClick={() => {
                                                            logout();
                                                            setIsDropdownOpen(false);
                                                        }}
                                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full"
                                                    >
                                                        <LogOut size={16} />
                                                        Logout
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link href="/auth/login" className="flex items-center gap-2 text-sm font-semibold">
                                        <User size={20} />
                                        Login / Register
                                    </Link>
                                )}
                            </div>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setIsCartOpen(true)}
                                    className="relative bg-[#EDF0F8] p-3 rounded-[50%]"
                                >
                                    <ShoppingBag size={20} strokeWidth={1.5} />
                                    <span className="absolute top-0 -right-2 border-2 border-white bg-[#184193] text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">0</span>
                                </button>
                                <Link href="/wishlist" className="relative bg-[#EDF0F8] p-3 rounded-[50%]">
                                    <Heart size={20} strokeWidth={1.5} />
                                    <span className="absolute top-0 -right-2 border-2 border-white bg-[#184193] text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
                                        {wishlistCount}
                                    </span>
                                </Link>

                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-8 mt-4">
                        <div className="flex flex-row items-center justify-center gap-8 mt-4">
                            <div className="relative group">
                                <button className="flex items-center gap-2 text-sm py-3 px-4 border border-[#184193] rounded-[2rem]">
                                    All Categories
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>

                            <nav className="flex-1">
                                <ul className="flex gap-8">
                                    {categories.slice(0, 4).map(category => (
                                        <li key={category.id}>
                                            <Link
                                                href={`/products/category/${category.slug}`}
                                                className="text-sm py-1.5 px-4 line-clamp-1"
                                            >
                                                {category.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            <div className="md:hidden">
                <div className="flex items-center justify-between px-4 py-3">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                        <Menu size={24} />
                    </button>
                    <Link href="/" className="flex-shrink-0">
                        <Image src="/logo.png" alt="Steadfast" width={120} height={32} />
                    </Link>
                    <div className="flex">
                        <Link href="/auth/login" className="relative p-2">
                            <User size={24} />
                        </Link>
                        <button onClick={() => setIsCartOpen(true)} className="relative p-2">
                            <ShoppingBag size={24} />
                            <span className="absolute top-0 right-0 bg-[#184193] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                        </button>
                    </div>
                </div>

                <div className="px-4 pb-3">
                    <Suspense fallback={
                        <div className="w-full h-10 bg-gray-100 animate-pulse rounded-full" />
                    }>
                        <SearchComponent />
                    </Suspense>
                </div>

                {isMenuOpen && (
                    <div className="fixed inset-0 bg-white z-50 flex flex-col">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-lg font-semibold">
                                {showCategories ? 'Categories' : 'Menu'}
                            </h2>
                            <button
                                onClick={() => showCategories ? setShowCategories(false) : setIsMenuOpen(false)}
                                className="p-2"
                            >
                                {showCategories ? '←' : '✕'}
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <nav className="p-4">
                                {!showCategories ? (
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-sm font-bold text-black mb-3">MENU</h3>
                                            <ul className="space-y-4">
                                                <li>
                                                    <Link
                                                        href="/"
                                                        className="flex items-center justify-between py-2 text-[15px]"
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        Home
                                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                                                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/wishlist"
                                                        className="flex items-center justify-between py-2 text-[15px]"
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        Wishlist
                                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                                                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/cart"
                                                        className="flex items-center justify-between py-2 text-[15px]"
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        Cart
                                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                                                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/products"
                                                        className="flex items-center justify-between py-2 text-[15px]"
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        All Products
                                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                                                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <button
                                                        onClick={() => setShowCategories(true)}
                                                        className="flex items-center  font-medium justify-between py-2 text-[15px] w-full"
                                                    >
                                                        Categories
                                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                                                            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </button>
                                                </li>

                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-bold text-black mb-3">ACCOUNT</h3>
                                            <ul className="space-y-4">
                                                <li>
                                                    <Link
                                                        href="/auth/login"
                                                        className="flex items-center justify-between py-2 text-[15px]"
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        Login / Register
                                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                                                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                ) : (
                                    <ul className="space-y-4">
                                        {categories.map(category => (
                                            <li key={category.id}>
                                                <Link
                                                    href={`/products/category/${category.slug}`}
                                                    className="flex items-center justify-between py-2 text-[15px]"
                                                    onClick={() => {
                                                        setShowCategories(false);
                                                        setIsMenuOpen(false);
                                                    }}
                                                >
                                                    {category.name}
                                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                                                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </nav>
                        </div>
                    </div>
                )}
            </div>
            <CartPanel
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />
        </header>);
};
