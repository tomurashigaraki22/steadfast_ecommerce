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
import { useAuth } from '@/contexts/AuthContext';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('personal');
    const { user } = useAuth();
    
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
                    user={{
                        firstName: user?.first_name || '',
                        lastName: user?.last_name || '',
                        email: user?.email || '',
                        phone: user?.phone_number || '',
                        address: user?.address || ''
                    }}
                />;
            case 'security':
                return <SecurityTab />;
            case 'notification':
                return <NotificationsTab />;
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