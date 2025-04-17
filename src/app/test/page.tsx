'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { SocialButton } from '@/components/auth/SocialButton'; 
import { WhyShopWithUs } from '@/components/sections/WhyShopWithUs';
import { ProductGrid } from '@/components/product/ProductGrid';
import { DealOfMonth } from '@/components/sections/DealOfMonth';
import ShopByCategory from '@/components/category/ShopByCategory';

type ModalType = 'info' | 'warning' | 'success';

interface ModalConfig {
    type: ModalType;
    title: string;
    message: string;
    autoClose?: boolean;
    bottomText?: string;
    buttons?: Array<{
        text: string;
        onClick: () => void;
        variant?: 'primary' | 'secondary' | 'outline';
    }>;
}

// Add this after the ModalConfig interface
interface FilterOption {
    id: string;
    label: string;
    type: 'checkbox' | 'radio' | 'range';
    options?: Array<{ value: string; label: string }>;
    range?: { min: number; max: number };
}

export default function TestPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState<ModalConfig>({
        type: 'info',
        title: '',
        message: '',
        autoClose: false,
        bottomText: '',
    });
    const DemoTitle = ({ text }: { text: string }) => {
        return (

            <div className="bg-black mt-[10rem]">
                <h5 className='text-white text-center py-5'>#test-section - {text}</h5>
            </div>
        )
    }
    const showModal = (config: ModalConfig) => {
        setModalConfig(config);
        setIsModalOpen(true);
    };

    const productFilters: FilterOption[] = [
        {
            id: 'category',
            label: 'Category',
            type: 'checkbox',
            options: [
                { value: 'adidas', label: 'Adidas' },
                { value: 'armani', label: 'Armani' },
                { value: 'geneva', label: 'Geneva' },
                { value: 'gucci', label: 'Gucci' },
                { value: 'nike', label: 'Nike' },
            ],
        },
        {
            id: 'rating',
            label: 'Rating',
            type: 'checkbox',
        },
        {
            id: 'price',
            label: 'Pricing',
            type: 'range',
        }
    ];


    const products = [
        {
            productId: '1',
            title: "Chilliwack black Bomber",
            brand: "HUMANATURE",
            price: 95000,
            rating: 4,
            image: "/product.png",
            isNew: true,
            discount: {
                amount: 10000,
                percentage: 5
            }
        },
        {
            productId: '2',
            title: "Chilliwack black Bomber",
            brand: "HUMANATURE",
            price: 95000,
            rating: 4,
            image: "/product.png",
            isNew: true,
            discount: {
                amount: 10000,
                percentage: 5
            }
        },
        {
            productId: '3',
            title: "Chilliwack black Bomber",
            brand: "HUMANATURE",
            price: 95000,
            rating: 4,
            image: "/product.png",
            isNew: true,
            discount: {
                amount: 10000,
                percentage: 5
            }
        },
        {
            productId: '4',
            title: "Chilliwack black Bomber",
            brand: "HUMANATURE",
            price: 95000,
            rating: 4,
            image: "/product.png",
            discount: {
                amount: 10000,
                percentage: 5
            }
        },
        {
            productId: '5',
            title: "Chilliwack black Bomber",
            brand: "HUMANATURE",
            price: 95000,
            rating: 4,
            image: "/product.png",
            discount: {
                amount: 10000,
                percentage: 5
            }
        },
        {
            productId: '6',
            title: "Chilliwack black Bomber",
            brand: "HUMANATURE",
            price: 95000,
            rating: 4,
            image: "/product.png",
            isNew: true,
            discount: {
                amount: 10000,
                percentage: 5
            }
        }
    ];



    const [isLoading, setIsLoading] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState(products);

    // Add this type definition near the top of the file with other interfaces
    type FilterValue = string[] | number[] | { min?: number; max?: number };

    const handleFilterChange = async (filters: Record<string, FilterValue>) => {
        setIsLoading(true);
        console.log(filters);
        try {
            await new Promise(resolve => setTimeout(resolve, 500));

            const newProducts = products.filter(product => {
                // Add your filter logic here
                console.log(product)
                return true;
            });

            setFilteredProducts(newProducts);
        } finally {
            setIsLoading(false);
        }
    };




    return (
        <div className="min-h-screen p-8 space-y-8">
            <h1 className="text-2xl font-bold mb-8">Component Testing Page</h1>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Modals</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Button
                        onClick={() =>
                            showModal({
                                type: 'success',
                                title: 'Success Modal',
                                message: 'Operation completed successfully!',
                                autoClose: true,
                                bottomText: 'This will close in 3 seconds',
                            })
                        }
                    >
                        Auto-close Success Modal
                    </Button>

                    <Button
                        onClick={() =>
                            showModal({
                                type: 'warning',
                                title: 'Warning Modal',
                                message: 'Are you sure you want to proceed?',
                                buttons: [
                                    {
                                        text: 'Cancel',
                                        onClick: () => setIsModalOpen(false),
                                        variant: 'outline',
                                    },
                                    {
                                        text: 'Proceed',
                                        onClick: () => setIsModalOpen(false),
                                    },
                                ],
                            })
                        }
                    >
                        Warning Modal with Buttons
                    </Button>

                    <Button
                        onClick={() =>
                            showModal({
                                type: 'info',
                                title: 'Information',
                                message: 'Here is some important information.',
                                bottomText: 'Click anywhere to close',
                            })
                        }
                    >
                        Info Modal
                    </Button>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Inputs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                    <Input label="Regular Input" placeholder="Type something..." />
                    <Input label="With Error" error="This field is required" placeholder="Error state" />
                    <Input label="Password Input" type="password" isPassword placeholder="Enter password" />
                    <Input label="Disabled Input" disabled placeholder="Disabled input" />
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Buttons</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button>Primary Button</Button>
                    <Button variant="secondary">Secondary Button</Button>
                    <Button variant="outline">Outline Button</Button>
                    <Button isLoading>Loading Button</Button>
                </div>
            </section>



            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Social Buttons</h2>
                <div className="space-y-3 max-w-md">
                    <SocialButton provider="google" label="Continue with Google" />
                    <SocialButton provider="facebook" label="Continue with Facebook" />
                    <SocialButton provider="apple" label="Continue with Apple" />
                </div>
            </section>


            <DemoTitle text="Shop with Us" />

            <WhyShopWithUs />

            <DemoTitle text="Shop by Category" />

            <ShopByCategory />

            <DemoTitle text="Deals of the month" />
            <DealOfMonth />

            <DemoTitle text="Product Grid without filter" />
 

      
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                {...modalConfig}
            />
        </div>
    );
}

