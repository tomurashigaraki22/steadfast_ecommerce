'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ProductGrid } from '@/components/product/ProductGrid';
import { TopBanner } from '@/components/layout/TopBanner';
import { Header } from '@/components/layout/Header';
import { NoProducts } from '@/components/ui/NoProducts';
import { demoProducts, categories } from '@/data/demo';
 
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
    category: string;
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

export default function CategoryPage() {
    const params = useParams();
    const categorySlug = params.category as string;
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [productFilters, setProductFilters] = useState<FilterOption[]>([]);
    const [categoryInfo, setCategoryInfo] = useState<typeof categories[0] | null>(null);


    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            // Fetch products by category using the category slug
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/category/${categorySlug}`);
            const data = await response.json();
            const products = data.products || [];
            
            // Map API response to Product interface
            // Replace 'any' with proper type
            const formattedProducts = products.map((product: {
                id: string;
                name: string;
                price: number;
                rating?: number;
                images: string[];
                category: string;
                stock_quantity: number;
            }) => ({
                productId: product.id,
                title: product.name,
                brand: '', // Add brand if available in API
                price: product.price,
                rating: product.rating || 0,
                image: product.images[0] || '',
                images: product.images,
                category: product.category,
                isNew: false, // Add logic to determine if product is new
                dateCreated: '', // Add creation date if available
                dateUpdated: '', // Add update date if available
                stock: product.stock_quantity,
                totalSold: 0, // Add total sold if available
                discount: undefined // Add discount if available
            }));
        
            setProducts(formattedProducts);
        
            // Generate filters based on fetched products
            const prices = formattedProducts.map((p: Product) => p.price);
            const ratings = Array.from<number>(new Set(formattedProducts.map((p: Product) => p.rating))).sort((a, b) => b - a);
        
            // Use formattedProducts instead of filteredProducts since we're working with the newly fetched products
            const dynamicFilters: FilterOption[] = [
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
                        {
                            value: 'newest', label: 'Newest', amount: demoProducts.filter(p => {
                                const createDate = new Date(p.dateCreated);
                                const threeMonthsAgo = new Date();
                                threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
                                return createDate > threeMonthsAgo;
                            }).length
                        },
                        {
                            value: 'oldest', label: 'Oldest', amount: demoProducts.filter(p => {
                                const createDate = new Date(p.dateCreated);
                                const sixMonthsAgo = new Date();
                                sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
                                return createDate <= sixMonthsAgo;
                            }).length
                        },
                        { value: 'highest-rated', label: 'Highest Rated', amount: demoProducts.filter(p => p.rating >= 4).length }
                    ]
                },
                {
                    id: 'price',
                    label: 'Price Range',
                    type: 'range',
                    range: {
                        min: Math.min(...(prices.length ? prices : [0])),
                        max: Math.max(...(prices.length ? prices : [0]))
                    }
                },
                {
                    id: 'rating',
                    label: 'Rating',
                    type: 'rating',
                    options: ratings.map(rating => ({
                        value: rating.toString(),
                        label: `${rating}★ & above`,
                        amount: formattedProducts.filter((p: Product) => p.rating >= rating).length
                    }))
                }
            ];

            setProductFilters(dynamicFilters);
        
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]); // Add fetchProducts to dependency array

    useEffect(() => {
        if (products.length < 1 && !isLoading) {
            return;
        }

        const currentCategory = categories.find(cat => cat.slug === categorySlug);
        setCategoryInfo(currentCategory || null);

        // Filter products by category
        const filteredProducts = currentCategory
            ? products.filter(product => product.category === categorySlug)
            : [];

        // Only update state if products actually changed
        if (JSON.stringify(filteredProducts) !== JSON.stringify(products)) {
            setProducts(filteredProducts);
        }

        // Generate filters based on filtered products
        const prices = filteredProducts.map(p => p.price);
        const ratings = Array.from(new Set(filteredProducts.map(p => p.rating))).sort((a, b) => b - a);

        const dynamicFilters: FilterOption[] = [
            {
                id: 'popularity',
                label: 'Most Popular',
                type: 'radio',
                options: [
                    {
                        value: 'most-popular',
                        label: 'Most Popular',
                        amount: demoProducts.filter((p: Product) =>
                            p.rating >= 4 &&
                            (p.totalSold / p.stock) >= 0.7
                        ).length
                    },
                    {
                        value: 'least-popular',
                        label: 'Least Popular',
                        amount: demoProducts.filter((p: Product) =>
                            p.rating < 4 ||
                            (p.totalSold / p.stock) < 0.3
                        ).length
                    },
                    {
                        value: 'newest', 
                        label: 'Newest', 
                        amount: demoProducts.filter((p: Product) => {
                            const createDate = new Date(p.dateCreated);
                            const threeMonthsAgo = new Date();
                            threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
                            return createDate > threeMonthsAgo;
                        }).length
                    },
                    {
                        value: 'oldest', 
                        label: 'Oldest', 
                        amount: demoProducts.filter((p: Product) => {
                            const createDate = new Date(p.dateCreated);
                            const sixMonthsAgo = new Date();
                            sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
                            return createDate <= sixMonthsAgo;
                        }).length
                    },
                    { 
                        value: 'highest-rated', 
                        label: 'Highest Rated', 
                        amount: demoProducts.filter((p: Product) => p.rating >= 4).length 
                    }
                ]
            },
            {
                id: 'price',
                label: 'Price Range',
                type: 'range',
                range: {
                    min: Math.min(...(prices.length ? prices : [0])),
                    max: Math.max(...(prices.length ? prices : [0]))
                }
            },
            {
                id: 'rating',
                label: 'Rating',
                type: 'rating',
                options: ratings.map(rating => ({
                    value: rating.toString(),
                    label: `${rating}★ & above`,
                    amount: filteredProducts.filter(p => p.rating >= rating).length
                }))
            }
        ];

        setProducts(filteredProducts);
        setProductFilters(dynamicFilters);
    }, [categorySlug, isLoading, products]); // Add missing dependencies

    

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

    if (!categorySlug || products.length === 0 && !isLoading) {
        return (
            <>
                <TopBanner theme={'dark'} />
                <Header />
                <NoProducts />
            </>
        );
    }

    return (
        <>
            <TopBanner theme={'dark'} />
            <Header />
          
            <ProductGrid
                title={categorySlug}
                subtitle={categorySlug}
                products={products.map(product => ({
                    ...product,
                    images: product.image ? [product.image] : [] // Ensure images array exists
                }))}
                filters={productFilters as import('@/components/product/ProductFilter').FilterOption[]}
                onFilterChange={handleFilterChange}
                isLoading={isLoading}
                maxRecord={12}
                emptyState={<NoProducts />}
                breadCrumb={[
                    { label: 'Home', href: '/' },
                    { label: 'Categories', href: '/categories' },
                    { label: categoryInfo?.name || '' }
                ]}
            />
        </>
    );
}