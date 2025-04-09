'use client';

import { useState } from 'react';

export const PickupSection = () => {
    const [selectedState, setSelectedState] = useState('');

    return (
        <div className="bg-white max-w-xl mx-auto">
            <h2 className="text-lg text-center font-semibold mb-8">Pick Up Point</h2>

            <div className="space-y-8">
                <div>
                    <h3 className="text-lg mb-4">Abia State</h3>
                    <div className="relative">
                        <select
                            value={selectedState}
                            onChange={(e) => setSelectedState(e.target.value)}
                            className="w-full p-4 text-gray-500 bg-white border border-gray-200 rounded-lg text-center appearance-none focus:outline-none"
                        >
                            <option value="">Select your pick up point</option>
                            <option value="point1">Aba Main Branch</option>
                            <option value="point2">Umuahia Office</option>
                            <option value="point3">Ohafia Center</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-[#E5E7EB]">
                    <h3 className="text-lg text-center font-semibold mb-6">Shipping Calculator</h3>
                    <div className="space-y-4 text-sm">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Expected Delivery Timeframe</span>
                            <span className="font-medium">6 Days</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Shipping Fee</span>
                            <span className="font-medium">NGN 6,000</span>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-[#E5E7EB]">
                            <span className="font-medium">Estimated total:</span>
                            <span className="text-base font-semibold">NGN 6,000</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};