'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Pen } from 'lucide-react';

const defaultAddress = {
    firstName: 'Jessica',
    lastName: 'Jackson',
    email: 'jess@mail.com',
    phone: '+2347000000000',
    city: 'Lagos',
    state: 'Lagos',
    address: '123 Main Street'
};

export const ShippingAddressSection = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [shippingDetails, setShippingDetails] = useState(defaultAddress);

    return (
        <div className="bg-white">
            <div className="flex justify-between items-center mb-6 px-2 md:px-0">
                <h2 className="text-lg font-semibold">Shipping Address</h2>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-[#184193] flex items-center text-sm"
                >
                    <Pen size={14} className="mr-1" />
                    Edit
                </button>
            </div>

            {isEditing ? (
                <div className="p-2 md:p-0">
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="First Name"
                                value={shippingDetails.firstName}
                                onChange={(e) => setShippingDetails({ ...shippingDetails, firstName: e.target.value })}
                            />
                            <Input
                                label="Last Name"
                                value={shippingDetails.lastName}
                                onChange={(e) => setShippingDetails({ ...shippingDetails, lastName: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Email Address"
                                type="email"
                                value={shippingDetails.email}
                                onChange={(e) => setShippingDetails({ ...shippingDetails, email: e.target.value })}
                            />
                            <Input
                                label="Mobile Number"
                                type="tel"
                                value={shippingDetails.phone}
                                onChange={(e) => setShippingDetails({ ...shippingDetails, phone: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="City"
                                value={shippingDetails.city}
                                onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })}
                            />
                            <Input
                                label="State"
                                value={shippingDetails.state}
                                onChange={(e) => setShippingDetails({ ...shippingDetails, state: e.target.value })}
                            />
                        </div>
                        <Input
                            label="Apartment Number and Street Address"
                            value={shippingDetails.address}
                            onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
                        />
                    </form>
                </div>
            ) : (
                <div className="p-2 md:p-0 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className='bg-[#18419310] py-2 px-5 rounded-lg'>
                        <label className="block text-sm text-gray-500 mb-1">First Name</label>
                        <p className="text-gray-900">{shippingDetails.firstName}</p>
                    </div>
                    <div className='bg-[#18419310] py-2 px-5 rounded-lg'>
                        <label className="block text-sm text-gray-500 mb-1">Last Name</label>
                        <p className="text-gray-900">{shippingDetails.lastName}</p>
                    </div>
                    <div className='bg-[#18419310] py-2 px-5 rounded-lg'>
                        <label className="block text-sm text-gray-500 mb-1">Email Address</label>
                        <p className="text-gray-900">{shippingDetails.email}</p>
                    </div>
                    <div className='bg-[#18419310] py-2 px-5 rounded-lg'>
                        <label className="block text-sm text-gray-500 mb-1">Mobile Number</label>
                        <p className="text-gray-900">{shippingDetails.phone}</p>
                    </div>
                    <div className='bg-[#18419310] py-2 px-5 rounded-lg'>
                        <label className="block text-sm text-gray-500 mb-1">City</label>
                        <p className="text-gray-900">{shippingDetails.city}</p>
                    </div>
                    <div className='bg-[#18419310] py-2 px-5 rounded-lg'>
                        <label className="block text-sm text-gray-500 mb-1">State</label>
                        <p className="text-gray-900">{shippingDetails.state}</p>
                    </div>
                    <div className='bg-[#18419310] col-span-1 md:col-span-2 py-2 px-5 rounded-lg'>
                        <label className="block text-sm text-gray-500 mb-1">Address</label>
                        <p className="text-gray-900">{shippingDetails.address}</p>
                    </div>
                </div>
            )}
        </div>
    );
};