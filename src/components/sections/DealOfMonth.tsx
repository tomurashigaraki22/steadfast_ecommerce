import { useEffect, useState } from 'react';
import { ProductCard } from '../product/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface Product {
    productId: string;
    title: string;
    brand: string;
    price: number;
    rating: number | 0;
    image: string;
    images: string[];
    isNew?: boolean;
    category: string;
    dateCreated: string;
    dateUpdated: string;
    categoryId: string;
    stock: number;
    totalSold: number;
    discount?: {
        amount: number;
        percentage: number;
    };
}

interface DealOfMonthProps {
    products: Product[];
}

export const DealOfMonth = ({ products }: DealOfMonthProps) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, [products]);

    return (
        <section className="py-[2rem]">
            <div className="container mx-auto px-4">
                <h2 className="text-lg md:text-xl font-semibold text-center mb-8">Deal of the Month</h2>

                <div>
                    <div className="md:hidden">
                        <Swiper
                            modules={[Pagination]}
                            spaceBetween={20}
                            slidesPerView={1.5}
                            pagination={{
                                clickable: true,
                                dynamicBullets: true,
                            }}
                            className="mySwiper pb-10"
                        >
                            {isLoading ? (
                                Array.from({ length: 3 }).map((_, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="animate-pulse bg-gray-200 rounded-lg h-[300px] w-full"></div>
                                    </SwiperSlide>
                                ))
                            ) : (
                                products.map((product, index) => (
                                    <SwiperSlide key={index}>
                                        <ProductCard {...product} titleHeight={true} padButton={true} />
                                    </SwiperSlide>
                                ))
                            )}
                        </Swiper>
                    </div>

                    <div className="hidden md:grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {isLoading ? (
                            Array.from({ length: 10 }).map((_, index) => (
                                <div key={index} className="animate-pulse bg-gray-200 rounded-lg h-[300px]"></div>
                            ))
                        ) : (
                            products.map((product, index) => (
                                <ProductCard
                                    key={`${product.productId}-${index}`}
                                    {...product}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};