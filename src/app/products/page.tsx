'use client';

import { useEffect, useState } from 'react';
import { ProductGrid } from '@/components/product/ProductGrid';
import { TopBanner } from '@/components/layout/TopBanner';
import { Header } from '@/components/layout/Header';
import { demoProducts, categories } from '@/data/demo';

// Move these to a separate types file later
type FilterValue = string[] | number[] | { min?: number; max?: number };

interface FilterOption {
    id: string;
    label: string;
    type: 'checkbox' | 'radio' | 'range' | 'rating';
    options?: Array<{ value: string; label: string; amount?: number }>;
    range?: { min: number; max: number };
}

interface Product {
    productId: string;
    title: string;
    brand: string;
    price: number;
    rating: number;
    image: string;
    isNew?: boolean;
    dateCreated: string;
    dateUpdated: string;
    stock: number;
    totalSold: number;
    discount?: {
        amount: number;
        percentage: number;
    };
}

export default function ProductsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [productFilters, setProductFilters] = useState<FilterOption[]>([]);

    useEffect(() => {
        const prices = demoProducts.map(p => p.price);
        const ratings = Array.from(new Set(demoProducts.map(p => p.rating))).sort((a, b) => b - a);

        const dynamicFilters: FilterOption[] = [
            {
                id: 'category',
                label: 'Category',
                type: 'checkbox',
                options: categories.map(category => ({
                    value: category.id,
                    label: category.name,
                    amount: demoProducts.filter(p => p.categoryId === category.id).length
                }))
            },
            {
                id: 'popularity',
                label: 'Most Popular',
                type: 'radio',
                options: [
                    { 
                        value: 'most-popular', 
                        label: 'Most Popular', 
                        amount: demoProducts.filter(p => 
                            p.rating >= 4 && 
                            (p.totalSold / p.stock) >= 0.7
                        ).length 
                    },
                    { 
                        value: 'least-popular', 
                        label: 'Least Popular', 
                        amount: demoProducts.filter(p => 
                            p.rating < 4 || 
                            (p.totalSold / p.stock) < 0.3
                        ).length 
                    },
                    { value: 'newest', label: 'Newest', amount: demoProducts.filter(p => {
                        const createDate = new Date(p.dateCreated);
                        const threeMonthsAgo = new Date();
                        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
                        return createDate > threeMonthsAgo;
                    }).length },
                    { value: 'oldest', label: 'Oldest', amount: demoProducts.filter(p => {
                        const createDate = new Date(p.dateCreated);
                        const sixMonthsAgo = new Date();
                        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
                        return createDate <= sixMonthsAgo;
                    }).length },
                    { value: 'highest-rated', label: 'Highest Rated', amount: demoProducts.filter(p => p.rating >= 4).length }
                ]
            },
            {
                id: 'price',
                label: 'Price Range',
                type: 'range',
                range: {
                    min: Math.min(...prices),
                    max: Math.max(...prices)
                }
            },
            {
                id: 'rating',
                label: 'Rating',
                type: 'rating',
                options: ratings.map(rating => ({
                    value: rating.toString(),
                    label: `${rating}★ & above`,
                    amount: demoProducts.filter(p => p.rating >= rating).length
                }))
            }
        ];

        setProducts(demoProducts);
        setProductFilters(dynamicFilters);
    }, []);

    const handleFilterChange = async (filters: Record<string, FilterValue>) => {
        setIsLoading(true);
        try {
             await new Promise(resolve => setTimeout(resolve, 500));

             const filteredProducts = products.filter(product => {
                console.log('Filters:', filters);
                console.log('Product:', product);
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
                products={products}
                filters={productFilters as import('@/components/product/ProductFilter').FilterOption[]}
                onFilterChange={handleFilterChange}
                isLoading={isLoading}
                maxRecord={4}
            />
        </>
    );
}