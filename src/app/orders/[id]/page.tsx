'use client';

import { useState } from 'react';
import Image from 'next/image';
import { TopBanner } from '@/components/layout/TopBanner';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RatingModal } from '@/components/orders/RatingModal';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';

interface OrderActivity {
    message: string;
    date: string;
}

interface OrderProduct {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

// Add this after your existing interfaces
interface OrderStage {
    label: string;
    status: 'completed' | 'current' | 'upcoming';
}

export default function OrderDetailsPage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Orders', href: '/orders' },
        { label: 'Order Details' }
    ];
    const orderStages: OrderStage[] = [
        { label: 'Order Placed', status: 'completed' },
        { label: 'Processing', status: 'completed' },
        { label: 'Shipped', status: 'current' },
        { label: 'Arrived', status: 'upcoming' },
        { label: 'Delivered', status: 'upcoming' }
    ];
    const orderActivities: OrderActivity[] = [
        {
            message: "Your order has been delivered. Thank you for shopping at Steadfast International!",
            date: "23 Mar, 2025 at 7:32 PM"
        },
        {
            message: "Your order has arrived at the pickup location and is ready for collection.",
            date: "23 Mar, 2025 at 2:00 PM"
        },
        {
            message: "Your order has been shipped.",
            date: "21 Mar, 2025 at 8:00 AM"
        },
        {
            message: "Your order is successfully processed.",
            date: "20 Mar, 2025 at 7:32 PM"
        },
        {
            message: "Your order has been confirmed.",
            date: "20 Mar, 2025 at 7:32 PM"
        }
    ];

    const products: OrderProduct[] = [
        {
            id: "1",
            name: "POP SURFACE LIGHT Modern Outdoor Lightening unit - White finish, 36 Watt Variant",
            image: '/product1.png',
            price: 89900,
            quantity: 1
        },
        {
            id: "2",
            name: "POP SURFACE LIGHT Modern Outdoor Lightening unit - White finish, 36 Watt Variant",
            image: '/product2.png',
            price: 89900,
            quantity: 1
        }
    ];

    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

    const handleRatingSubmit = async (rating: number, comment: string) => {
        // TODO: Implement API call to submit rating
        console.log('Rating submitted:', { rating, comment });
    };

    return (
        <>
            <TopBanner theme="dark" />
            <Header />
            <main className="container mx-auto px-4 py-8">
                <Breadcrumb items={breadcrumbItems} className="mb-6" />

                <div className="bg-white rounded-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-medium  h-full">Order Details</h1>
                        <div className="">
                            <Button
                                variant="outline"
                                onClick={() => setIsRatingModalOpen(true)}
                                className="text-[#18419] flex items-center gap-1"
                                rounded={true}
                            >

                                Leave a Rating
                                <Plus className='text-[#184193] w-5 h-5' />
                            </Button>
                        </div>
                    </div>

                    <div className="bg-[#F8F9FA] rounded-lg p-6 mb-8">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-lg font-medium">#96459761</h2>
                                <p className="text-sm text-gray-500">4 Products • Order Placed on 17 Jan, 2021 at 7:32 PM</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[#184193] text-xl font-semibold">NGN 94,099.00</p>
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-6">Order expected arrival 23 Mar, 2025</p>

                        <div className="relative">
                            <div className="relative">
                                {/* Base line */}
                                <div className="absolute top-3 left-8 right-8 h-[2px] bg-[#E5E9F2] -z-10" />


                                <div className="flex justify-between mb-4 relative z-10">
                                    {orderStages.map((stage, index) => (
                                        <div key={index} className="flex flex-col items-center">
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-2 
                                                ${stage.status === 'completed'
                                                    ? 'bg-[#184193] text-white'
                                                    : 'border bg-white border-[#184193]'}`}
                                            >
                                                {stage.status === 'completed' ? (
                                                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M20 6L9 17l-5-5" />
                                                    </svg>
                                                ) : (
                                                    <div className="w-1.5 h-1.5 bg-[#184193] rounded-full"></div>
                                                )}
                                            </div>
                                            <span className="text-xs">{stage.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="absolute top-3 left-8 right-8 h-[4px] bg-[#E5E9F2]" />
                            <div
                                className="absolute top-3 left-8 h-[4px] bg-[#184193]"
                                style={{
                                    width: `calc(${((orderStages.findIndex(stage => stage.status === 'current') + 1) / (orderStages.length - 1)) * 100}% - 12px)`
                                }}
                            />
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-lg font-medium mb-4">Order Activity</h2>
                        <div className="space-y-4">
                            {orderActivities.map((activity, index) => (
                                <div key={index} className="flex items-start gap-3 bg-[#F8F9FA] p-4 rounded-lg">
                                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20 6L9 17l-5-5" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm">{activity.message}</p>
                                        <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-lg font-medium mb-4">Product (02)</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-[#F8F9FA] text-sm">
                                    <tr>
                                        <th className="text-left py-3 px-4">PRODUCTS</th>
                                        <th className="text-right py-3 px-4">PRICE</th>
                                        <th className="text-right py-3 px-4">QUANTITY</th>
                                        <th className="text-right py-3 px-4">SUB TOTAL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product.id} className="border-b">
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative w-16 h-16">
                                                        <Image
                                                            src={product.image}
                                                            alt={product.name}
                                                            fill
                                                            className="object-cover rounded"
                                                        />
                                                    </div>
                                                    <div className="text-sm">{product.name}</div>
                                                </div>
                                            </td>
                                            <td className="text-right py-4 px-4">NGN {product.price.toLocaleString()}</td>
                                            <td className="text-right py-4 px-4">x{product.quantity}</td>
                                            <td className="text-right py-4 px-4">NGN {(product.price * product.quantity).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <h3 className="font-medium mb-3">Shipping Address</h3>
                            <div className="bg-[#F8F9FA] p-4 rounded-lg">
                                <p className="font-medium mb-2">Jessica Jackson</p>
                                <p className="text-sm text-gray-600">34 Michael Crescent, Adjacent next cash and carry, Ojota, Enugu State.</p>
                                <p className="text-sm text-gray-600 mt-2">
                                    <span className="font-medium">Phone Number:</span> +234 8070001981
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">Email:</span> jackson.jess@gmail.com
                                </p>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-medium mb-3">Pick up Point</h3>
                            <div className="bg-[#F8F9FA] p-4 rounded-lg">
                                <p className="font-medium mb-2">The Young Shall Grow</p>
                                <p className="text-sm text-gray-600">2 Market Rd, Ogui Rd, Enugu</p>
                                <p className="text-sm text-gray-600 mt-2">
                                    <span className="font-medium">Phone Number:</span> +234 8070001981
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">Email:</span> jackson.jess@gmail.com
                                </p>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-medium mb-3">Order Notes</h3>
                            <div className="bg-[#F8F9FA] p-4 rounded-lg">
                                <p className="text-sm text-gray-600">
                                    Lorem ipsum not Lorem ipsum not Lorem ipsum not Lorem ipsum not Lorem ipsum not Lorem ipsum not Lorem ipsum not Lorem ipsum not Lorem ipsum not Lorem ipsum not Lorem ipsum not Lorem ipsum not Lorem ipsum not Lorem ipsum not
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
            <RatingModal
                isOpen={isRatingModalOpen}
                onClose={() => setIsRatingModalOpen(false)}
                onSubmit={handleRatingSubmit}
            />
        </>
    );
}