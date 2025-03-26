import Image from 'next/image';
import { StarRating } from '@/components/ui/StarRating';
import { ActionButton } from '../ui/ActionButton';

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
}

export const ProductCard = ({
    title,
    brand,
    price,
    rating,
    image,
    isNew,
    discount
}: ProductCardProps) => {
    return (
        <div className="flex flex-col">
            <div className="relative group">
                <div className="relative w-full h-[250px] rounded-lg overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                </div>

                {isNew && (
                    <span className="absolute top-2 right-2 bg-white px-2 py-1 text-xs font-medium rounded">
                        NEW
                    </span>
                )}


            </div>

            <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                    <StarRating rating={rating} />
                    <button
                        className=" p-2 rounded-full hover:bg-gray-100/80"
                        aria-label="Add to wishlist"
                    >
                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 1C2.7912 1 1 2.73964 1 4.88594C1 6.61852 1.7 10.7305 8.5904 14.8873C8.71383 14.961 8.85552 15 9 15C9.14448 15 9.28617 14.961 9.4096 14.8873C16.3 10.7305 17 6.61852 17 4.88594C17 2.73964 15.2088 1 13 1C10.7912 1 9 3.35511 9 3.35511C9 3.35511 7.2088 1 5 1Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                    </button>
                </div>
                <div className="space-y-1">
                    <h3 className="font-medium">{title}</h3>
                    <p className="text-gray-600 text-sm">{brand}</p>
                </div>

                <div className="flex items-start gap-2 mb-[2rem] flex-col justify-center">
                    <span className="font-semibold">NGN {price.toLocaleString()}</span>
                    {discount && (
                        <div className="flex items-center space-x-1 text-xs">
                            <span className="bg-[#38CB89] text-xs font-bold text-white px-1.5 py-0.5 rounded">SALE</span>
                            <span className="text-black text-[.7rem] font-bold">Save NGN {discount.amount.toLocaleString()}</span>
                            <span className="text-black text-[.7rem] font-bold">• {discount.percentage}%</span>
                        </div>
                    )}
                </div>

                <ActionButton fullWidth onClick={() => console.log('clicked')}>
                    ADD TO CART
                </ActionButton>
            </div>
        </div>
    );
};