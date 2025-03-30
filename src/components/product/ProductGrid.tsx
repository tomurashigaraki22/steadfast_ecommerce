import { useState } from 'react';
import { ProductCard } from './ProductCard';
import { ProductFilter, FilterOption } from './ProductFilter';

interface ProductGridProps {
    title: string;
    subtitle?: string;
    viewAllLink?: string;
    products: Array<{
        productId: string;
        title: string;
        brand: string;
        price: number;
        rating: number;
        image: string;
        isNew?: boolean;
        discount?: {
            amount: number;
            percentage: number;
        };
    }>;
    filters?: FilterOption[];
    onFilterChange?: (filters: Record<string, any>) => void;
    isLoading?: boolean;
}

export const ProductGrid = ({ 
    title, 
    subtitle, 
    viewAllLink, 
    products, 
    filters,
    onFilterChange,
    isLoading = false 
}: ProductGridProps) => {
    const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});

    const handleFilterChange = (filterId: string, value: any) => {
        const newFilters = {
            ...activeFilters,
            [filterId]: value
        };
        setActiveFilters(newFilters);
        onFilterChange?.(newFilters);
    };

    return (
        <section className="space-y-4 py-[2rem] relative">
            <div className="container mx-auto  px-5 md:px-0 ">

            {isLoading && (
                <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                </div>
            )}
            
            <div className="flex justify-between mb-5 items-center">
                <div>
                    <h2 className="text-lg font-semibold">{title}</h2>
                    {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
                </div>
                {viewAllLink && (
                    <a href={viewAllLink} className="text-sm text-gray-600 hover:text-gray-900 flex items-center">
                        View All
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                )}
            </div>

            <div className="flex gap-6">
                {filters && (
                    <div className="w-64 flex-shrink-0">
                        <ProductFilter
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            activeFilters={activeFilters}
                        />
                    </div>
                )}

                <div className="flex-1">
                    <div className={`grid grid-cols-1 ${filters ? 'md:grid-cols-3' : 'md:grid-cols-4'} gap-[2rem] md:gap-6`}>
                        {products.map((product) => (
                            <ProductCard key={product.productId} {...product} />
                        ))}
                    </div>
                </div>
            </div>
            </div>
        </section>
    );
};