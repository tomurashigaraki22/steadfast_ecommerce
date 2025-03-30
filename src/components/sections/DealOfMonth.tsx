import { ProductCard } from '../product/ProductCard';

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
            <div className="container mx-auto px-5 md:px-0">
                <h2 className="text-lg md:text-xl font-semibold text-center mb-8">Deal of the Month</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {dealProducts.map((product) => (
                        <ProductCard
                            key={product.productId}
                            {...product}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};