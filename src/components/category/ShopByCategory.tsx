import { CategoryCard } from "./CategoryCard"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { categories as demoCategories } from '@/data/demo';
import { useState, useEffect } from 'react';

const ShopByCategory = () => {
    const [categories, setCategories] = useState(demoCategories);

    useEffect(() => {
        setCategories(demoCategories);
    }, []);

    return (
        <section className="space-y-4 py-[1rem] md:py-[2rem]">
            <div className="container mx-auto px-4 md:px-[5rem]">
                <h2 className="text-lg md:text-xl font-semibold text-center mb-8">Shop by Categories</h2>

                <div className="">
                    <div className="md:hidden">
                        <Swiper
                            modules={[Pagination]}
                            spaceBetween={24}
                            slidesPerView={2}
                            pagination={{
                                clickable: true,
                                dynamicBullets: true,
                            }}
                            className="mySwiper pb-10"
                        >
                            {categories.slice(0, 12).map((category) => (
                                <SwiperSlide key={category.id}>
                                    <CategoryCard {...category} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className="hidden md:grid md:grid-cols-6 gap-6">
                        {categories.slice(0, 12).map((category) => (
                            <CategoryCard key={category.id} {...category} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShopByCategory;