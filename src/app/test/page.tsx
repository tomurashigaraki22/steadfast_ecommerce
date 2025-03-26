'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { SocialButton } from '@/components/auth/SocialButton';
import { ProductCard } from '@/components/product/ProductCard';

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

export default function TestPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState<ModalConfig>({
        type: 'info',
        title: '',
        message: '',
        autoClose: false,
        bottomText: '',
    });

    const showModal = (config: ModalConfig) => {
        setModalConfig(config);
        setIsModalOpen(true);
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
            <section className="space-y-4 md:px-[2rem]">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Explore Products</h2>
                    <a href="/products" className="text-sm text-gray-600 hover:text-gray-900 flex items-center">
                        View All
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-[2rem] md:gap-6">
                    <ProductCard
                        title="Chilliwack black Bomber"
                        brand="HUMANATURE"
                        price={95000}
                        rating={4}
                        image="/product.png"
                        isNew={true}
                        discount={{
                            amount: 10000,
                            percentage: 5
                        }}
                    />
                    <ProductCard
                        title="Chilliwack black Bomber"
                        brand="HUMANATURE"
                        price={95000}
                        rating={4}
                        image="/product.png"
                        isNew={true}
                        discount={{
                            amount: 10000,
                            percentage: 5
                        }}
                    />
                    <ProductCard
                        title="Chilliwack black Bomber"
                        brand="HUMANATURE"
                        price={95000}
                        rating={4}
                        image="/product.png"
                        discount={{
                            amount: 10000,
                            percentage: 5
                        }}
                    />
                    <ProductCard
                        title="Chilliwack black Bomber"
                        brand="HUMANATURE"
                        price={95000}
                        rating={4}
                        image="/product.png"
                        discount={{
                            amount: 10000,
                            percentage: 5
                        }}
                    />
                    <ProductCard
                        title="Chilliwack black Bomber"
                        brand="HUMANATURE"
                        price={95000}
                        rating={4}
                        image="/product.png"
                        isNew={true}
                        discount={{
                            amount: 10000,
                            percentage: 5
                        }}
                    />
                </div>
            </section>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                {...modalConfig}
            />
        </div>
    );
}