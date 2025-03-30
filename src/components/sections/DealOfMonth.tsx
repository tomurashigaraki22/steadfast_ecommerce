import { ProductCard } from '../product/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface DealProduct {
    productId: string;
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

export const DealOfMonth = () => {
    const dealProducts: DealProduct[] = [
        {
            productId: '1',
            title: "Modern Glass Pendant Light",
            brand: "HUMANATURE",
            price: 95000,
            rating: 4,
            image: "/product.png",
            discount: {
                amount: 30000,
                percentage: 5
            }
        },
        {
            productId: '2',
            title: "Cloud Bubble Chandelier",
            brand: "HUMANATURE",
            price: 95000,
            rating: 4,
            image: "/product.png",
            discount: {
                amount: 30000,
                percentage: 5
            }
        },
        {
            productId: '3',
            title: "LED Corn Light Bulb",
            brand: "HUMANATURE",
            price: 95000,
            rating: 3,
            image: "/product.png",
            discount: {
                amount: 30000,
                percentage: 5
            }
        },
        {
            productId: '4',
            title: "Industrial Bar Light",
            brand: "HUMANATURE",
            price: 95000,
            rating: 4,
            image: "/product.png",
            discount: {
                amount: 30000,
                percentage: 5
            }
        },
        {
            productId: '5',
            title: "Crystal Drum Chandelier",
            brand: "HUMANATURE",
            price: 95000,
            rating: 4,
            image: "/product.png",
            discount: {
                amount: 30000,
                percentage: 5
            }
        }
    ];

    return (
        <section className="py-[2rem] ">
            <div className="container mx-auto px-4 md:px-0">
                <h2 className="text-lg md:text-xl font-semibold text-center mb-8">Deal of the Month</h2>


                <div className="">
                    <div className="md:hidden">
                        <Swiper
                            modules={[Pagination]}
                            spaceBetween={10}
                            slidesPerView={2}
                            pagination={{
                                clickable: true,
                                dynamicBullets: true,
                            }}
                            className="mySwiper pb-10"
                        >
                            {dealProducts.map((product, index) => (
                                <SwiperSlide key={index}>
                                    <ProductCard {...product} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>


                    <div className="hidden md:grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {dealProducts.map((product) => (
                            <ProductCard
                                key={product.productId}
                                {...product}
                            />
                        ))}
                    </div>
                </div>


            </div>
        </section>
    );
};