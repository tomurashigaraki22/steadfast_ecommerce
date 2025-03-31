'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import { FavoritesHelper } from '@/lib/favorites';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Heart, Share2 } from 'lucide-react';
import { TopBanner } from '@/components/layout/TopBanner';
import { Header } from '@/components/layout/Header';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { demoProducts, categories } from '@/data/demo';
import { StarRating } from '@/components/ui/StarRating';
import { ActionButton } from '@/components/ui/ActionButton';
import { BookmarkIcon } from '@/components/icons/bookmark';
import { Footer } from '@/components/layout/Footer';
import { ProductTabs } from '@/components/product/ProductTabs';
import { ProductGrid } from '@/components/product/ProductGrid';
interface Product {
    productId: string;
    title: string;
    brand: string;
    price: number;
    rating: number;
    image: string;
    isNew?: boolean;
    dateCreated: string;
    dateUpdated: string;
    stock: number;
    totalSold: number;
    discount?: {
        amount: number;
        percentage: number;
    };
}
export default function ProductDetailPage() {
    const params = useParams();
    const productId = params.id as string;
    const [selectedVariant, setSelectedVariant] = useState('500');
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        setIsWishlisted(FavoritesHelper.isProductFavorite(productId));
    }, [productId]);

    useEffect(() => {
        setProducts(demoProducts);
    }, []);
    const toggleWishlist = async () => {
        try {
            setIsLoading(true);

            if (isWishlisted) {
                FavoritesHelper.removeFromFavorites(productId);
            } else {
                FavoritesHelper.addToFavorites(productId);
            }

            setIsWishlisted(!isWishlisted);
        } catch (error) {
            console.error('Error updating wishlist:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddToCart = () => {
        setIsAdded(!isAdded);
        console.log('Added to cart');
    };
    const product = demoProducts.find(p => p.productId === productId);
    const category = product ? categories.find(c => c.id === product.categoryId) : null;

    if (!product || !category) {
        return <div>Product not found</div>;
    }

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Categories', href: '/categories' },
        { label: category.name, href: `/products/category/${category.slug}` },
        { label: product.title }
    ];

    return (
        <>
            <TopBanner theme="dark" />
            <Header />
            <main className="container mx-auto px-4 pt-8">
                <Breadcrumb items={breadcrumbItems} />

                <div className="flex flex-col md:flex-row gap-8 mt-8">
                    {/* Product Images */}
                    <div className="md:w-1/2">
                        <div className="relative aspect-square mb-4">
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-cover rounded-lg"
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {[1, 2, 3].map((_, index) => (
                                <div key={index} className="relative aspect-square">
                                    <Image
                                        src={product.image}
                                        alt={`${product.title} view ${index + 1}`}
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="md:w-1/2">
                        <div className="flex flex-col md:flex-row gap-5 md:gap-0 md:items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="flex">
                                    <StarRating rating={product.rating} />

                                </div>
                                <span className="text-sm text-gray-600">{product.rating} Reviews</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <button className="flex items-center gap-1 bg-[#FFF0F0] text-[#D46F77] px-3 py-2 rounded-xl">
                                    <Heart size={16} className="text-[#D46F77]" />
                                    <span className="text-sm text-[#D46F77] ">109</span>
                                </button>
                                <button
                                    className={`flex items-center bg-[#EDF0F8] text-[#000] px-3 py-2 rounded-xl ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    aria-label="Add to wishlist"
                                    onClick={toggleWishlist}
                                    disabled={isLoading}>
                                    <BookmarkIcon
                                        className={isWishlisted ? 'text-black-500' : 'text-black'}
                                        isFilled={isWishlisted} />
                                </button>
                                <button className="flex items-center bg-[#EDF0F8] text-[#000] px-3 py-2 rounded-xl">
                                    <Share2 size={20} className="text-black" />
                                </button>
                            </div>
                        </div>

                        <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>
                        <p className="text-gray-400 text-sm mb-4">POP/Surface Light</p>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Buy one or buy a few and make every space where you sit more convenient. Light and easy to move around with removable tray top; handy for serving snacks.
                        </p>

                        <p className="text-2xl font-semibold mb-8">NGN {product.price.toLocaleString()}.00</p>

                        <div className="mb-8">
                            <h3 className="font-medium mb-4">Choose your variation</h3>
                            <div className="flex gap-4">
                                {['400', '500', '600'].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedVariant(size)}
                                        className={`w-24 py-2 rounded-full border ${selectedVariant === size
                                            ? 'border-[#184193] bg-[#184193] text-white'
                                            : 'border-gray-200'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex items-center bg-[#F4F4F4] rounded-xl w-32">
                                <button
                                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                                    className="px-4 py-3 text-lg"
                                >
                                    −
                                </button>
                                <span className="flex-1 text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-4 py-3 text-lg"
                                >
                                    +
                                </button>
                            </div>
                            <ActionButton
                                variant={isAdded ? 'outline' : 'primary'}
                                fullWidth
                                isCart
                                onClick={handleAddToCart}
                            >
                                {isAdded ? 'ADDED TO CART' : 'ADD TO CART'}
                            </ActionButton>
                        </div>
                    </div>
                </div>

                <ProductTabs productId={product.productId} />

            </main>
            <ProductGrid
                title="Similar Items You Might Also Like"
                products={products.slice(0, 4)}
                isLoading={isLoading} />
            <Footer />
        </>
    );
}