'use client';

import { useState } from 'react';
import { TopBanner } from '@/components/layout/TopBanner';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SecurityTab } from './components/SecurityTab';
import { NotificationsTab } from './components/NotificationsTab';
import { ProfileTab } from './components/ProfileTab';
import { LogoutTab } from './components/LogoutTab';

const defaultProfile = {
    firstName: 'Jessica',
    lastName: 'Jackson',
    email: 'jess@mail.com',
    phone: '+234',
    address: 'No.1 Apartment Street, Address ltd, Lagos, Nigeria'
};

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('personal');
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Profile' }
    ];

    const tabs = [
        { id: 'personal', label: 'Personal Information' },
        { id: 'notification', label: 'Notification' },
        { id: 'security', label: 'Security' },
    ];

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'personal':
                return <ProfileTab
                    firstName={defaultProfile.firstName}
                    lastName={defaultProfile.lastName}
                    email={defaultProfile.email}
                    phone={defaultProfile.phone}
                    address={defaultProfile.address}
                />;
            case 'security':
                return <SecurityTab />;
            case 'notification':
                return <NotificationsTab />;
            case 'orders':
                return (
                    <div className="py-[2.5rem] px-[2.5rem] bg-[#FAFAFA] max-w-2xl mx-auto mt-[3rem] border border-[#00000010] rounded-2xl">
                        <h1 className="text-xl font-medium mb-1">Order History</h1>
                        <p className="text-sm text-[#15151580]">View your order history</p>
                        {/* Add order history content */}
                    </div>
                );
            case 'logout':
                return <LogoutTab />;
            default:
                return null;
        }
    };

    return (
        <>
            <TopBanner theme="dark" />
            <Header />
            <main className="min-h-screen">
                <div className="container mx-auto px-4 py-8">
                    <Breadcrumb items={breadcrumbItems} className="mb-6" />
                    <div className="bg-white rounded-xl">
                        <nav className="flex border-b border-[#E0E5EB]">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-6 py-4 text-sm font-medium transition-colors relative
                                        ${activeTab === tab.id
                                            ? 'text-[#184193]'
                                            : 'text-[#15151580] hover:text-gray-700'
                                        }
                                    `}
                                >
                                    {tab.label}
                                    {activeTab === tab.id && (
                                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#184193]" />
                                    )}
                                </button>
                            ))}
                        </nav>
                        {renderActiveTab()}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}