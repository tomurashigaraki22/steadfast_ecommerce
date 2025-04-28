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
    rating: number | 0;  // Updated to handle null ratings
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

export const DealOfMonth = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
                const data = await response.json();
                console.log('Fetched products:', data.products); // Log the fetched product
                setProducts(data.products || []);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error('Error fetching products:', error.message);
                }
                setProducts([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <section className="py-[2rem] ">
            <div className="container mx-auto px-4 ">
                <h2 className="text-lg md:text-xl font-semibold text-center mb-8">Deal of the Month</h2>

                {isLoading ? (
                    <div className="flex justify-center items-center min-h-[200px]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#184193]"></div>
                    </div>
                ) : (
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
                                {products.map((product, index) => (
                                    <SwiperSlide key={index}>
                                        <ProductCard {...product} titleHeight={true} padButton={true} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {products.map((product, index) => (
                                <ProductCard
                                    key={`${product.productId}-${index}`}
                                    {...product}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};