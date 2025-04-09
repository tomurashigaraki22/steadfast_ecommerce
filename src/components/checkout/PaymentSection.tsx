'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import OrderItems from '../cart/OrderItems';


export const PaymentSection = () => {
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardHolder: ''
    });

    return (
        <>
            <OrderItems />
        </>

    );
};