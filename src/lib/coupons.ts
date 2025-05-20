export interface Coupon {
    id: string;
    code: string;
    type: 'percentage' | 'fixed';
    value: number;
    minAmount: number | null;
    description: string;
    is_available: boolean;
}

export interface CouponVerification {
    valid: boolean;
    message?: string;
    coupon?: {
        id: string;
        code: string;
        type: string;
        value: number;
        description: string;
    };
    discount_amount?: number;
    final_amount?: number;
}

export const CouponHelper = {
    getAllCoupons: async (): Promise<Coupon[]> => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/coupons`);
            const data = await response.json();
            return data.coupons;
        } catch (error) {
            console.error('Failed to fetch coupons:', error);
            return [];
        }
    },

    verifyCoupon: async (code: string, amount: number): Promise<CouponVerification> => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/coupons/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code, amount }),
            });

            const data = await response.json();

            if (response.ok) {
                return data;
            } else {
                throw new Error(data.error || 'Failed to verify coupon');
            }
        } catch (error) {
            return {
                valid: false,
                message: error instanceof Error ? error.message : 'Failed to verify coupon'
            };
        }
    }
};