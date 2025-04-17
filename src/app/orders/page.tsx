'use client';

import { useState } from 'react';
import Image from 'next/image';
import { TopBanner } from '@/components/layout/TopBanner';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import Link from 'next/link';

interface OrderItem {
    orderId: string;
    date: string;
    status: string;
    productCount: number;
    image: string;
}

const demoOrders: OrderItem[] = [
    {
        orderId: '987651',
        date: 'April 3, 2025 10:30AM',
        status: 'Shipped on April 8, 2025',
        productCount: 3,
        image: '/product1.png'
    },
    {
        orderId: '987651',
        date: 'April 3, 2025 10:30AM',
        status: 'Delivered on April 9, 2025',
        productCount: 3,
        image: '/product2.png'
    },
    {
        orderId: '987651',
        date: 'April 3, 2025 10:30AM',
        status: 'Delivered on April 9, 2025',
        productCount: 0,
        image: '/product3.png'
    },
    {
        orderId: '987651',
        date: 'April 3, 2025 10:30AM',
        status: 'Cancelled, Payment Unsuccessful',
        productCount: 0,
        image: '/product4.png'
    },
    {
        orderId: '987651',
        date: 'April 3, 2025 10:30AM',
        status: 'Shipped on April 8, 2025',
        productCount: 5,
        image: '/product5.png'
    }
];


export default function OrdersPage() {
    const [orders] = useState<OrderItem[]>(demoOrders);

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Profile', href: '/profile' },
        { label: 'Order History' }
    ];

    const getStatusColor = (status: string) => {
        if (status.includes('Delivered')) return 'text-[#037847]';
        if (status.includes('Shipped')) return 'text-gray-700';
        if (status.includes('Cancelled')) return 'text-[#FF4B4B]';
        return 'text-gray-700';
    };

    return (
        <>
            <TopBanner theme="dark" />
            <Header />
            <main className="container mx-auto px-4 py-8">
                <Breadcrumb items={breadcrumbItems} className="mb-6" />
                
                {orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 px-4">
                        <div className="relative w-[200px] h-[200px] mb-6">
                            <Image
                                src="/empty-orders.png"
                                alt="Empty Orders"
                                fill
                                priority
                                className="object-contain"
                            />
                        </div>
                        <h2 className="text-2xl font-medium text-gray-900 mb-2">No orders yet</h2>
                        <p className="text-gray-500 mb-6">Browse our products and start shopping</p>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-2xl font-medium">Orders</h1>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Showing 6 Result from total 16</span>
                                <select className="border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white">
                                    <option>All</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {orders.map((order, index) => (
                                <div key={index} className="bg-white py-5 border-b border-[#E8ECEF] flex gap-6">
                                    <div className="relative w-[166px] h-[166px] shrink-0">
                                        <Image
                                            src={order.image}
                                            alt={`Order ${order.orderId}`}
                                            fill
                                            className="object-cover rounded-lg"
                                            priority
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between pb-[1rem]">
                                        <div className="flex justify-between items-start">
                                            <div className=''>
                                                <h3 className="text-lg font-semibold">
                                                    Order ID #{order.orderId} 
                                                    {order.productCount > 0 && ` (${order.productCount} Products)`}
                                                </h3>
                                                <p className="text-sm text-[#15151570] mt-2">Placed on {order.date}</p>
                                            </div>
                                            <Link 
                                                href={`/orders/${order.orderId}`}
                                                className="text-[#184193] hover:text-blue-700 font-semibold text-sm"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                        <p className={`mt-6 text-sm font-medium ${getStatusColor(order.status)}`}>• {order.status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </main>
            <Footer />
        </>
    );
}