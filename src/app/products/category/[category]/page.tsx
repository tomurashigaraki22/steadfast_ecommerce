'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Header } from '@/components/layout/Header';
import { TopBanner } from '@/components/layout/TopBanner';

type FilterValue = string[] | number[] | { min?: number; max?: number };

interface Product {
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
}

// Add FilterOption interface
interface FilterOption {
    id: string;
    label: string;
    type: 'checkbox' | 'radio' | 'range';
    options?: Array<{ value: string; label: string }>;
    range?: { min: number; max: number };
}

export default function CategoryPage() {
    const params = useParams();
    const category = params.category as string;
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);

    const productFilters: FilterOption[] = [
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

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            setIsLoading(true);
            try {
                // Here you would make an API call to fetch products for this category
                await new Promise(resolve => setTimeout(resolve, 500));

                // Simulate products data
                const categoryProducts = [
                    {
                        productId: '1',
                        title: "Category Product",
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
                ];

                setProducts(categoryProducts);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategoryProducts();
    }, [category]);

    const handleFilterChange = async (filters: Record<string, FilterValue>) => {
        setIsLoading(true);
        try {
            // Here you would make an API call with the filters
            await new Promise(resolve => setTimeout(resolve, 500));

            // Filter products based on the filters
            const filteredProducts = products.filter(product => {
                console.log('Filters:', filters);
                console.log('Product:', product);
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
                title={`${category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}`}
                // subtitle={`Explore our ${category.replace('-', ' ')} collection`}
                products={products}
                filters={productFilters}
                onFilterChange={handleFilterChange}
                isLoading={isLoading}
            />
        </>
    );
}