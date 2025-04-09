import { ProductCard } from '../product/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { demoProducts } from '@/data/demo';

export const DealOfMonth = () => {
    
    const dealProducts =demoProducts.slice(4, 9);

    return (
        <section className="py-[2rem] ">
            <div className="container mx-auto px-4 ">
                <h2 className="text-lg md:text-xl font-semibold text-center mb-8">Deal of the Month</h2>


                <div className="">
                    <div className="md:hidden">
                        <Swiper
                            modules={[Pagination]}
                            spaceBetween={10}
                            slidesPerView={1}
                            pagination={{
                                clickable: true,
                                dynamicBullets: true,
                            }}
                            className="mySwiper pb-10"
                        >
                            {dealProducts.map((product, index) => (
                                <SwiperSlide key={index}>
                                    <ProductCard {...product} titleHeight={true} />
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