import { CategoryCard } from "./CategoryCard"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const categories = [
    {
        title: "Chanderliers",
        image: "/category.png",
        href: "/category/chanderliers"
    },
    {
        title: "POP/Surface Lights",
        image: "/category.png",
        href: "/category/surface-lights"
    },
    {
        title: "Outdoor Lights",
        image: "/category.png",
        href: "/category/outdoor-lights"
    },
    {
        title: "Solar Lights",
        image: "/category.png",
        href: "/category/solar-lights"
    },
    {
        title: "Indoor Lights",
        image: "/category.png",
        href: "/category/indoor-lights"
    },
    {
        title: "Ceiling Fittings",
        image: "/category.png",
        href: "/category/ceiling-fittings"
    },
    {
        title: "Rope Light",
        image: "/category.png",
        href: "/category/rope-light"
    },
    {
        title: "Track Light",
        image: "/category.png",
        href: "/category/track-light"
    },
    {
        title: "Pendant/Drop Lights",
        image: "/category.png",
        href: "/category/pendant-lights"
    },
    {
        title: "Switch & Sockets",
        image: "/category.png",
        href: "/category/switches"
    },
    {
        title: "Electrical accessories",
        image: "/category.png",
        href: "/category/accessories"
    },
    {
        title: "Bedside and Table Lamp",
        image: "/category.png",
        href: "/category/table-lamp"
    }
];

const ShopByCategory = () => {
    return (
        <section className="space-y-4 py-[5rem] md:py-[2rem]">
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
                            {categories.map((category, index) => (
                                <SwiperSlide key={index}>
                                    <CategoryCard {...category} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Desktop View */}
                    <div className="hidden md:grid md:grid-cols-6 gap-6">
                        {categories.map((category, index) => (
                            <CategoryCard key={index} {...category} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShopByCategory;