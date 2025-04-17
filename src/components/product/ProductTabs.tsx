import { useState } from 'react';
import { ProductDescription } from './ProductDescription';
import { ProductReviews } from './ProductReviews';

interface ProductTabsProps {
    productId: string;
}

export const ProductTabs = ({ productId }: ProductTabsProps) => {
    const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');

    return (
        <div className="mt-16">
            <div className="border-b border-gray-200">
                <nav className="flex gap-8">
                    <button 
                        onClick={() => setActiveTab('description')}
                        className={`pb-4 font-medium ${
                            activeTab === 'description' 
                                ? 'text-[#184193] border-b-2 border-[#184193]' 
                                : 'text-gray-500'
                        }`}
                    >
                        Description
                    </button>
                    <button 
                        onClick={() => setActiveTab('reviews')}
                        className={`pb-4 font-medium ${
                            activeTab === 'reviews' 
                                ? 'text-[#184193] border-b-2 border-[#184193]' 
                                : 'text-gray-500'
                        }`}
                    >
                        Reviews
                    </button>
                </nav>
            </div>

            <div className="py-8">
                {activeTab === 'description' ? (
                    <ProductDescription />
                ) : (
                    <ProductReviews productId={productId} />
                )}
            </div>
        </div>
    );
};