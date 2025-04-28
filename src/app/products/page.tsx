'use client';

import { useEffect, useState } from 'react';
import { ProductGrid } from '@/components/product/ProductGrid';
import { TopBanner } from '@/components/layout/TopBanner';
import { Header } from '@/components/layout/Header';
import { categories } from '@/data/demo';

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
    rating: number | 0;  // Updated to handle null ratings
    image: string;
    images: string[];
    category: string;
    isNew?: boolean;
    dateCreated: string;
    dateUpdated: string;
    categoryId: string;
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
        if (!products || products.length === 0) return;

        const prices = products.map(p => p.price).filter(Boolean);
        const validRatings = products
            .map(p => p.rating)
            .filter((rating): rating is number => rating !== null && !isNaN(rating));
        const ratingsSet = new Set<number>(validRatings);
        const ratings = Array.from(ratingsSet).sort((a, b) => b - a);

        const dynamicFilters: FilterOption[] = [
            {
                id: 'category',
                label: 'Category',
                type: 'checkbox',
                options: categories.map(category => ({
                    value: category.id,
                    label: category.name,
                    amount: products.filter(p => p.categoryId === category.id).length
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
                        amount: products.filter(p => 
                            p.rating >= 4 && 
                            (p.totalSold / p.stock) >= 0.7
                        ).length 
                    },
                    { 
                        value: 'least-popular', 
                        label: 'Least Popular', 
                        amount: products.filter(p => 
                            p.rating < 4 || 
                            (p.totalSold / p.stock) < 0.3
                        ).length 
                    },
                    { value: 'newest', label: 'Newest', amount: products.filter(p => {
                        const createDate = new Date(p.dateCreated);
                        const threeMonthsAgo = new Date();
                        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
                        return createDate > threeMonthsAgo;
                    }).length },
                    { value: 'oldest', label: 'Oldest', amount: products.filter(p => {
                        const createDate = new Date(p.dateCreated);
                        const sixMonthsAgo = new Date();
                        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
                        return createDate <= sixMonthsAgo;
                    }).length },
                    { value: 'highest-rated', label: 'Highest Rated', amount: products.filter(p => p.rating >= 4).length }
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
                options: ratings.length > 0 ? ratings.map((rating: number) => ({
                    value: rating.toString(),
                    label: `${rating}★ & above`,
                    amount: products.filter(p => p.rating >= rating).length
                })) : []
            }
        ];

        setProductFilters(dynamicFilters);
    }, [products]);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
            const data = await response.json();
            const products = data.products || [];
            setProducts(products);
            
            // Add null checks and filter out invalid ratings
            const validProducts = products.filter((p: Product) => p && p.rating != null);
            const prices = validProducts.map((p: Product) => p.price);
            const ratingsSet = new Set<number>(validProducts.map((p: Product) => Number(p.rating) ?? 0));
            const ratings = Array.from(ratingsSet).filter((rating): rating is number => !isNaN(rating)).sort((a: number, b: number) => b - a);
            
            setProductFilters(prev => prev.map(filter => {
                if (filter.id === 'price') {
                    return {
                        ...filter,
                        range: {
                            min: Math.min(...prices),
                            max: Math.max(...prices)
                        }
                    };
                }
                if (filter.id === 'rating' && ratings.length > 0) {
                    return {
                        ...filter,
                        options: ratings.map(rating => ({
                            value: rating.toString(),
                            label: `${rating}★ & above`,
                            amount: validProducts.filter((p: Product) => p.rating >= rating).length
                        }))
                    };
                }
                return filter;
            }));

        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
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
                maxRecord={12}
            />
        </>
    );
}