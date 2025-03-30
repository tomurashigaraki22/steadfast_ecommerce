'use client';

import { useState } from 'react';
import { ProductGrid } from '@/components/product/ProductGrid';
import { TopBanner } from '@/components/layout/TopBanner';
import { Header } from '@/components/layout/Header';

// Move these to a separate types file later
type FilterValue = string[] | number[] | { min?: number; max?: number };

interface FilterOption {
    id: string;
    label: string;
    type: 'checkbox' | 'radio' | 'range';
    options?: Array<{ value: string; label: string }>;
    range?: { min: number; max: number };
}

export default function ProductsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([
        // Add your initial products here or fetch them
        {
            productId: '1',
            title: "Chilliwack black Bomber",
            brand: "HUMANATURE",
            price: 95000,
            rating: 4,
            image: "/product.png",
            isNew: true,
            discount: {
                amount: 10000,
                percentage: 5
            }
        },
        // ... more products
    ]);

    const productFilters: FilterOption[] = [
        {
            id: 'category',
            label: 'Category',
            type: 'checkbox',
            options: [
                { value: 'chanderliers', label: 'Chanderliers' },
                { value: 'surface-lights', label: 'Surface Lights' },
                { value: 'outdoor-lights', label: 'Outdoor Lights' },
                // ... more categories
            ],
        },
        {
            id: 'price',
            label: 'Price Range',
            type: 'range',
            range: { min: 0, max: 100000 }
        },
        {
            id: 'rating',
            label: 'Rating',
            type: 'checkbox',
            options: [
                { value: '4', label: '4★ & above' },
                { value: '3', label: '3★ & above' },
                { value: '2', label: '2★ & above' },
            ],
        },
    ];

    const handleFilterChange = async (filters: Record<string, FilterValue>) => {
        setIsLoading(true);
        try {
            // Here you would make an API call with the filters
            await new Promise(resolve => setTimeout(resolve, 500));

            // Filter products based on the filters
            const filteredProducts = products.filter(product => {
                console.log('Filters:', filters);
                console.log('Product:', product);
                // For now, we'll just return all products for simplicity   
                // Implement your filtering logic here
                return true;
            });

            setProducts(filteredProducts);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <TopBanner theme={'dark'} />
            <Header />
            <ProductGrid
                title="All Products"
                subtitle="Explore our complete collection"
                products={products}
                filters={productFilters}
                onFilterChange={handleFilterChange}
                isLoading={isLoading}
            />
        </>
    );
}