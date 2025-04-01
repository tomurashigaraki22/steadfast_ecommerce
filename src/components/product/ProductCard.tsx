
'use client';

import { useEffect } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { StarRating } from '@/components/ui/StarRating';
import { ActionButton } from '../ui/ActionButton';
import { HeartIcon } from '@/components/icons/Heart';
import { useState } from 'react';
import { FavoritesHelper } from '@/lib/favorites';

// Add to interface ProductCardProps
interface ProductCardProps {
    title: string;
    brand: string;
    price: number;
    rating: number;
    image: string;
    isNew?: boolean;
    discount?: {
        amount: number;
        percentage: number;
    };
    productId: string;
}


export const ProductCard = ({
    productId,
    title,
    brand,
    price,
    rating,
    image,
    isNew,
    discount
}: ProductCardProps) => {
    const router = useRouter();
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    console.log(image)

    // Generate deterministic image number based on productId
    const imageNumber = parseInt(productId) % 10 + 1;
    const imagePath = `/product${imageNumber}.png`;
    useEffect(() => {
        setIsWishlisted(FavoritesHelper.isProductFavorite(productId));
    }, [productId]);

    const handleProductClick = () => {
        router.push(`/products/v/${productId}`);
    };

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

    return (
        <div className="flex flex-col">
            <div
                className="relative group cursor-pointer"
                onClick={handleProductClick}
            >
                <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                    <Image
                        src={imagePath}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>

                {isNew && (
                    <span className="absolute top-3 right-3 bg-white px-2 py-1 text-xs font-medium rounded">
                        NEW
                    </span>
                )}
            </div>

            <div className="mt-4 space-y-2">
                <div className="flex justify-between px-1">
                    <StarRating rating={rating} />
                    <button
                        className={`p-2 rounded-full hover:bg-gray-100/80 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        aria-label="Add to wishlist"
                        onClick={toggleWishlist}
                        disabled={isLoading}
                    >
                        <HeartIcon
                            className={isWishlisted ? 'text-red-500' : 'text-black'}
                            isFilled={isWishlisted}
                        />
                    </button>
                </div>
                <div className="space-y-1  h-12 md:h-auto cursor-pointer px-1 " onClick={handleProductClick}>
                    <h3 className="font-medium text-[15px] line-clamp-2 md:line-clamp-1">{title}</h3>
                    <p className="hidden md:flex text-gray-600 text-xs line-clamp-1">{brand}</p>
                </div>

                <div className="flex items-start gap-2 mb-2 md:mb-[1rem]  px-1 flex-col justify-center">
                    <span className="font-semibold">NGN {price.toLocaleString()}</span>
                    {discount && (
                        <div className="hidden md:flex items-center space-x-1 text-xs">
                            <span className="bg-[#38CB89] text-[.6rem] font-bold text-white px-1.5 py-0.5 rounded">SALE</span>
                            <span className="text-black text-xs font-semibold"><svg width="4" height="5" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="2" cy="2.5" r="2" fill="#38CB89" />
                            </svg>
                            </span>
                            <span className="text-black text-[.7rem] font-[600]">Save NGN {discount.amount.toLocaleString()}</span>
                            <span className="text-black text-xs font-semibold"><svg width="4" height="5" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="2" cy="2.5" r="2" fill="#38CB89" />
                            </svg>
                            </span>
                            <span className="text-black text-[.7rem] font-[600]">{discount.percentage}%</span>
                        </div>
                    )}
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
    );
};