'use client';

import { useState, useEffect } from 'react';
import Select from 'react-select';
import deliveryData from '@/data/deliverydata.json';

type PickupSectionProps = {
    selectedState: string;
    onPickupSelect: (pickupData: { pickup: string | PickupOption | null; fee: string; duration: string }) => void;
    onDeliveryInfoChange: (deliveryInfo: { fee: string; duration: string }) => void;
};

type PickupOption = {
    value: string;
    label: string;
};

type StoredPickupData = {
    state: string;
    pickup: string | PickupOption;
};

const STORAGE_KEY = 'pickup_details';

export const PickupSection = ({ selectedState, onPickupSelect, onDeliveryInfoChange }: PickupSectionProps) => {
    const [selectedPickupPoint, setSelectedPickupPoint] = useState<PickupOption | null>(null);
    const [lagosPickupPoint, setLagosPickupPoint] = useState('');
    const [deliveryInfo, setDeliveryInfo] = useState<{
        fee: string;
        duration: string;
        pickups: string[];
    } | null>(null);

    useEffect(() => {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            const parsedData: StoredPickupData = JSON.parse(savedData);
            if (parsedData.state === selectedState) {
                if (selectedState.toUpperCase() === 'LAGOS') {
                    setLagosPickupPoint(parsedData.pickup as string);
                    onPickupSelect({ 
                        pickup: parsedData.pickup as string,
                        fee: deliveryInfo?.fee || '',
                        duration: deliveryInfo?.duration || ''
                    });
                } else {
                    setSelectedPickupPoint(parsedData.pickup as PickupOption);
                    onPickupSelect({ 
                        pickup: parsedData.pickup as PickupOption,
                        fee: deliveryInfo?.fee || '',
                        duration: deliveryInfo?.duration || ''
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (selectedState) {
            const stateData = deliveryData.find(
                state => state.state === selectedState.toUpperCase()
            );
            if (stateData) {
                setDeliveryInfo({
                    fee: stateData.fee,
                    duration: stateData.duration,
                    pickups: stateData.pickups
                });
                onDeliveryInfoChange({
                    fee: stateData.fee,
                    duration: stateData.duration
                });
                if (selectedState.toUpperCase() !== 'LAGOS') {
                    setSelectedPickupPoint(null);
                    setLagosPickupPoint('');
                    onPickupSelect({ pickup: null, fee: stateData.fee, duration: stateData.duration });
                }
            }
        }
    }, [selectedState, onDeliveryInfoChange]);

    const pickupOptions: PickupOption[] = deliveryInfo?.pickups.map(pickup => ({
        value: pickup,
        label: pickup
    })) || [];

    const handlePickupChange = (value: PickupOption | null) => {
        setSelectedPickupPoint(value);
        if (value) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                state: selectedState,
                pickup: value
            }));
            onPickupSelect({ 
                pickup: value,
                fee: deliveryInfo?.fee || '',
                duration: deliveryInfo?.duration || ''
            });
        } else {
            onPickupSelect({ pickup: null, fee: '', duration: '' });
        }
    };

    const handleLagosPickupChange = (value: string) => {
        setLagosPickupPoint(value);
        if (value) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                state: selectedState,
                pickup: value
            }));
            onPickupSelect({ 
                pickup: value,
                fee: deliveryInfo?.fee || '',
                duration: deliveryInfo?.duration || ''
            });
        } else {
            onPickupSelect({ pickup: null, fee: '', duration: '' });
        }
    };

    const isLagos = selectedState.toUpperCase() === 'LAGOS';

    return (
        <div className="bg-white max-w-xl mx-auto">
            <h2 className="md:text-lg text-center font-semibold mb-8">Pick Up Point</h2>

            <div className="space-y-8">
                {selectedState ? (
                    <div>
                        <h3 className="px-2 md:text-lg mb-2 md:mb-4">{selectedState}</h3>
                        {isLagos ? (
                            <input
                                type="text"
                                value={lagosPickupPoint}
                                onChange={(e) => handleLagosPickupChange(e.target.value)}
                                placeholder="Enter your pickup location"
                                className="w-full px-4 py-3 text-gray-500 bg-white border border-gray-200 rounded-lg text-center appearance-none focus:outline-none"
                            />
                        ) : (
                            <Select
                                value={selectedPickupPoint}
                                onChange={handlePickupChange}
                                options={pickupOptions}
                                placeholder="Select your pick up point"
                                className="react-select-container"
                                classNamePrefix="react-select"
                                isClearable
                            />
                        )}
                    </div>
                ) : (
                    <div className="text-center text-gray-500">
                        Please select a state in the shipping address section first
                    </div>
                )}

                <div className="pt-8 border-t border-[#E5E7EB]">
                    <h3 className="text-lg text-center font-semibold mb-6">Shipping Calculator</h3>
                    <div className="space-y-4 text-sm">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Expected Delivery Timeframe</span>
                            <span className="font-medium">{deliveryInfo?.duration || '-'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Shipping Fee</span>
                            <span className="font-medium">NGN {deliveryInfo?.fee || '-'}</span>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-[#E5E7EB]">
                            <span className="font-medium">Estimated total:</span>
                            <span className="text-base font-semibold">NGN {deliveryInfo?.fee || '-'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};