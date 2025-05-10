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
import { StarRating } from '@/components/ui/StarRating';
import { ActionButton } from '@/components/ui/ActionButton';
import { BookmarkIcon } from '@/components/icons/bookmark';
import { Footer } from '@/components/layout/Footer';
import { ProductTabs } from '@/components/product/ProductTabs';

interface Product {
    productId: string;
    name: string;
    brand: string;
    title?: string;
    price: number;
    rating: number | 0;
    image: string;
    images: string[];
    isNew?: boolean;
    dateCreated: string;
    dateUpdated: string;
    stock: number;
    review_count: number;
    category: string;
    totalSold: number;
    specifications?: Array<{ key: string; value: string }>;
    highlights?: Array<{ key: string; value: string }>;
    whats_in_box?: string[];
    description?: string;
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
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [magnifyPosition, setMagnifyPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setMagnifyPosition({ x, y });
    };

    useEffect(() => {
        setIsWishlisted(FavoritesHelper.isProductFavorite(productId));
    }, [productId]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                
                const cachedProducts = localStorage.getItem('products');
                if (cachedProducts) {
                    const parsedProducts = JSON.parse(cachedProducts);
                    setProducts(parsedProducts);
                    setIsPageLoading(false);
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
                const data = await response.json();
                const newProducts = data.products || [];
                
                setProducts(newProducts);
                localStorage.setItem('products', JSON.stringify(newProducts));
            } catch (error) {
                console.error('Error fetching products:', error);
                
                const cachedProducts = localStorage.getItem('products');
                if (cachedProducts) {
                    setProducts(JSON.parse(cachedProducts));
                }
            } finally {
                setIsLoading(false);
                setIsPageLoading(false);
            }
        };

        fetchProducts();
    }, [productId]);

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

    const product = products.find(p => parseInt(p.productId) === parseInt(productId));

    console.log(product);
    if (!product && !isPageLoading) {
        return <div>Product not found</div>;
    }

    if (isPageLoading) {
        return (
            <>
                <TopBanner theme="dark" />
                <Header />
                <main className="container mx-auto px-4 pt-8 pb-[5rem]">
                    <div className="animate-pulse">
                        <div className="h-6 w-64 bg-gray-200 rounded mb-8" />

                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="md:w-2/5">
                                <div className="relative aspect-square mb-4 bg-gray-200 rounded-lg" />
                                <div className="grid grid-cols-3 gap-4">
                                    {[1, 2, 3].map((index) => (
                                        <div key={index} className="aspect-square bg-gray-200 rounded-lg" />
                                    ))}
                                </div>
                            </div>

                            <div className="md:w-3/5 space-y-4">
                                <div className="flex justify-between items-center">
                                    <div className="w-32 h-6 bg-gray-200 rounded" />
                                    <div className="flex gap-4">
                                        {[1, 2, 3].map((index) => (
                                            <div key={index} className="w-10 h-10 bg-gray-200 rounded-xl" />
                                        ))}
                                    </div>
                                </div>

                                <div className="h-8 w-3/4 bg-gray-200 rounded" />
                                <div className="h-4 w-1/4 bg-gray-200 rounded" />
                                <div className="space-y-2">
                                    <div className="h-4 w-full bg-gray-200 rounded" />
                                    <div className="h-4 w-full bg-gray-200 rounded" />
                                    <div className="h-4 w-2/3 bg-gray-200 rounded" />
                                </div>

                                <div className="h-8 w-1/3 bg-gray-200 rounded" />

                                <div>
                                    <div className="h-6 w-48 bg-gray-200 rounded mb-4" />
                                    <div className="flex gap-4">
                                        {[1, 2, 3].map((index) => (
                                            <div key={index} className="w-24 h-10 bg-gray-200 rounded-full" />
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <div className="w-32 h-12 bg-gray-200 rounded-xl" />
                                    <div className="flex-1 h-12 bg-gray-200 rounded-xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <TopBanner theme="dark" />
            <Header />
            <main className="container mx-auto px-4 pt-8">
                <Breadcrumb items={[
                    { label: 'Home', href: '/' },
                    { label: 'Products', href: '/products' },
                    { label: product?.title || 'Product Details' }
                ]} />

                <div className="flex flex-col md:flex-row gap-8 mt-8">
                    <div className="md:w-2/5">
                        <div
                            className="relative aspect-square mb-4 cursor-crosshair"
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                            onMouseMove={handleMouseMove}
                        >
                            {product && (
                                <Image
                                    src={product.images[0]}
                                    alt={product.title || 'Product Image'}
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            )}
                        </div>
                        <div className="grid grid-cols-3 gap-4">

                            {product && product.images.slice(0, 3).map((image, index) => (
                                <div key={index} className="relative aspect-square">
                                    <Image
                                        src={image}
                                        alt={`${product.title} view ${index + 1}`}
                                        fill
                                        className="object-cover rounded-lg"
                                        sizes="(max-width: 768px) 33vw, 25vw"
                                        priority={index === 0}
                                    />
                                </div>
                            ))
                            }
                        </div>
                    </div>

                    {isHovering ? (
                        <div className="md:w-3/5 md:h-[30rem] overflow-hidden">
                            <div className="col-span-3 relative aspect-square rounded-lg overflow-hidden">
                                {product && (
                                    <div
                                        className="absolute w-full h-full"
                                        style={{
                                            backgroundImage: `url(${product.images[0]})`,
                                            backgroundPosition: `${magnifyPosition.x}% ${magnifyPosition.y}%`,
                                            backgroundSize: '200%',
                                            backgroundRepeat: 'no-repeat'
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="md:w-3/5">


                            <div className="flex flex-col md:flex-row gap-5 md:gap-0 md:items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="flex">
                                        <StarRating rating={product?.rating || 0} />
                                    </div>
                                    <span className="text-sm text-gray-600">{product?.review_count || 0} Reviews</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button className="flex items-center gap-1 bg-[#FFF0F0] text-[#D46F77] px-3 py-2 rounded-xl">
                                        <Heart size={16} className="text-[#D46F77]" />
                                        <span className="text-sm text-[#D46F77]">{product?.review_count || 0}</span>
                                    </button>
                                    <button
                                        className={`flex items-center bg-[#EDF0F8] text-[#000] px-3 py-2 rounded-xl ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        aria-label="Add to wishlist"
                                        onClick={toggleWishlist}
                                        disabled={isLoading}>
                                        <BookmarkIcon
                                            className={isWishlisted ? 'text-black-500' : 'text-black'}
                                            isFilled={isWishlisted}
                                        />
                                    </button>
                                    <button className="flex items-center bg-[#EDF0F8] text-[#000] px-3 py-2 rounded-xl">
                                        <Share2 size={20} className="text-black" />
                                    </button>
                                </div>
                            </div>

                            <h1 className="text-2xl font-semibold mb-2">{product?.title}</h1>
                            <p className="text-gray-400 text-sm mb-4">{product?.category}</p>
                            <p className="text-gray-600 mb-8 leading-relaxed line-clamp-5">{product?.description}</p>

                            <p className="text-2xl font-semibold mb-8">NGN {product?.price.toLocaleString()}.00</p>

                            {/* <div className="mb-8">
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
                        </div> */}

                            <div className="flex gap-4">
                                <div className="flex items-center bg-[#F4F4F4] rounded-xl w-32">
                                    <button
                                        onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                                        className="px-4 py-3 text-lg"
                                    >
                                        -
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
                    )}
                </div>

                {product && (
                    <ProductTabs product={product} />
                )}
            </main>
            <Footer />
        </>
    );
}