'use client';

import OrderItems from '../cart/OrderItems';

type PaymentSectionProps = {
    pickupLocation: {
        state: string;
        city: string;
        location: any;
    };
    deliveryInfo: {
        fee: string;
        duration: string;
    };
};

export const PaymentSection = ({ pickupLocation, deliveryInfo }: PaymentSectionProps) => {
    console.log(deliveryInfo)
    return (
        <>
            <OrderItems
                selectedState={pickupLocation.state}
                selectedCity={pickupLocation.city}
                pickupLocation={pickupLocation.location}
                deliveryFee={deliveryInfo.fee}
                deliveryDuration={deliveryInfo.duration}
            />
        </>
    );
};