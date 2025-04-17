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
import { ProductGrid } from '@/components/product/ProductGrid';
import { demoProducts } from '@/data/demo';
interface Product {
    id: string;
    name: string;
    brand: string;
    price: number;
    rating: number | 0;
    image: string;
    images: string[];
    isNew?: boolean;
    dateCreated: string;
    dateUpdated: string;
    stock: number;
    category: string;
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
    const [isPageLoading, setIsPageLoading] = useState(true);


    useEffect(() => {
        setIsWishlisted(FavoritesHelper.isProductFavorite(productId));
    }, [productId]);

    useEffect(() => {
        const fetchProducts = async () => {
            console.log("PRODUCTS: ", productId)
            try {
                setIsLoading(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
                const data = await response.json();
                console.log("DATA: ", data)
                setProducts(data.products || []);
            } catch (error) {
                console.error('Error fetching products:', error);
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

    const product = products.find(p => parseInt(p.id) === parseInt(productId));
    console.log("PRODUCT: ", product)
    console.log("PRID: ", productId)

    
    if (!product && !isPageLoading) {
        return <div>Product not found</div>;
    }

    if (isPageLoading) {
        return (
            <>
                <TopBanner theme="dark" />
                <Header />
                <main className="container mx-auto px-4 pt-8">
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#184193]"></div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    const breadCrumb = [
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: product?.name || 'Product Details' }
    ];

    return (
        <>
            <TopBanner theme="dark" />
            <Header />
            <main className="container mx-auto px-4 pt-8">
                <Breadcrumb items={breadCrumb} />

                <div className="flex flex-col md:flex-row gap-8 mt-8">
                    {/* Product Images */}
                    <div className="md:w-1/2">
                        <div className="relative aspect-square mb-4">
                        {product && (
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover rounded-lg"
                            />
                        )}
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                        {product && product.images.slice(1).map((image, index) => (
                            <div key={index} className="relative aspect-square">
                                <Image
                                    src={image}
                                    alt={`${product.name} view ${index + 1}`}
                                    fill
                                    className="object-cover rounded-lg"
                                    sizes="(max-width: 768px) 33vw, 25vw"
                                    priority={index === 0}
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
                                    <StarRating rating={product?.rating || 0} />
                                </div>
                                <span className="text-sm text-gray-600">{product?.rating} Reviews</span>
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

                        <h1 className="text-2xl font-semibold mb-2">{product?.name}</h1>
                        <p className="text-gray-400 text-sm mb-4">POP/Surface Light</p>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Buy one or buy a few and make every space where you sit more convenient. Light and easy to move around with removable tray top; handy for serving snacks.
                        </p>

                        <p className="text-2xl font-semibold mb-8">NGN {product?.price.toLocaleString()}.00</p>

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

                {product && (
                    <ProductTabs productId={product.id} />
                )}
            </main>
            <ProductGrid
                title="Similar Items You Might Also Like"
                products={demoProducts.slice(0, 4).map(product => ({
                    ...product,
                    images: product.image ? [product.image] : [] // Ensure images array exists
                }))}
                isLoading={isLoading} />
            <Footer />
        </>
    );
}