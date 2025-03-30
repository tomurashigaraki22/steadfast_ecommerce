import { useState, useEffect } from 'react';
import PriceRangeSlider from "./RangeSlider";

// Add type definitions for filter values
type FilterValue = string[] | number[] | { min?: number; max?: number };

export interface FilterOption {
    id: string;
    label: string;
    type: 'checkbox' | 'radio' | 'range' | 'rating';
    options?: Array<{ value: string; label: string; amount: Number }>;
    range?: { min: number; max: number };
}

interface ProductFilterProps {
    filters: FilterOption[];
    onFilterChange: (filterId: string, value: FilterValue) => void;
    activeFilters: Record<string, FilterValue>;
}

// Add type guard functions
const isArrayFilter = (value: FilterValue): value is (string[] | number[]) => {
    return Array.isArray(value);
};

export const ProductFilter = ({ filters, onFilterChange, activeFilters }: ProductFilterProps) => {
    const [tempFilters, setTempFilters] = useState<Record<string, FilterValue>>(activeFilters);
     // Update temp filters when active filters change externally
    useEffect(() => {
        setTempFilters(activeFilters);
    }, [activeFilters]);

    // Handle temporary filter changes
    const handleTempFilterChange = (filterId: string, value: FilterValue) => {
        setTempFilters(prev => ({
            ...prev,
            [filterId]: value
        }));
    };

    // Handle apply filters
    const handleApplyFilters = () => {
        // Apply all temporary filters

        Object.entries(tempFilters).forEach(([filterId, value]) => {
            console.log('Applying filter:', filterId, value);
            onFilterChange(filterId, value);
        });
    };

    // Handle reset filters
    const handleResetFilters = () => {
        // Reset to initial state
        setTempFilters({});
        Object.keys(activeFilters).forEach(filterId => {
            onFilterChange(filterId, []);
        });
    };

    return (
        <div className="w-full md:max-w-xs bg-white">
            <h2 className="hidden md:flex text-xl font-medium mb-6">Filters</h2>

            {filters.map((filter) => (
                <div key={filter.id} className="mb-6">
                    <div className="flex items-center w-full  justify-between mb-4">
                        <h3 className="text-base font-medium">{filter.label}</h3>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    {filter.type === 'radio' && filter.options && (
                        <div className="space-y-2">
                            {filter.options.map((option) => (
                                <label key={option.value} className="flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            name={filter.id}
                                            value={option.value}
                                            checked={isArrayFilter(tempFilters[filter.id]) && (tempFilters[filter.id] as string[])[0] === option.value}
                                            onChange={(e) => {
                                                handleTempFilterChange(filter.id, [e.target.value]);
                                            }}
                                            className="w-4 h-4 border-gray-300 text-blue-600"
                                        />
                                        <span className="ml-3 text-sm text-gray-700">{option.label}</span>
                                    </div>
                                    <span className="text-xs text-blue-600">{Number(option.amount)}</span>
                                </label>
                            ))}
                        </div>
                    )}

                    {filter.type === 'checkbox' && filter.options && (
                        <div className="space-y-2">
                            {filter.options.map((option) => (
                                <label key={option.value} className="flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={isArrayFilter(tempFilters[filter.id]) && (tempFilters[filter.id] as string[]).includes(option.value)}
                                            onChange={(e) => {
                                                const currentValues = (tempFilters[filter.id] as string[]) || [];
                                                const newValues = e.target.checked
                                                    ? [...currentValues, option.value]
                                                    : currentValues.filter((v: string) => v !== option.value);
                                                onFilterChange(filter.id, newValues);
                                            }}
                                            className="w-4 h-4 border-gray-300 rounded text-blue-600"
                                        />
                                        <span className="ml-3 text-sm text-gray-700">{option.label}</span>
                                    </div>
                                    <span className="text-xs text-blue-600">{Number(option.amount)}</span>

                                </label>
                            ))}
                        </div>
                    )}

                    {filter.type === 'rating' && filter.options && (

                        <div className="space-y-2">
                            {filter.options.map((rating) => (
                                <label key={rating.value} className="flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={isArrayFilter(tempFilters.rating) && (tempFilters.rating as number[]).includes(Number(rating.value))}
                                            onChange={(e) => {
                                                const currentValues = (tempFilters.rating as number[]) || [];
                                                const newValues = e.target.checked
                                                    ? [...currentValues, Number(rating.value)]
                                                    : currentValues.filter((v: number) => v !== Number(rating.value));
                                                onFilterChange('rating', newValues);
                                            }}
                                            className="w-4 h-4 border-gray-300 rounded text-blue-600"
                                        />
                                        <div className="ml-3 flex">
                                            {[...Array(Number(rating.value))].map((_, i) => (
                                                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                    <span className="text-xs text-blue-600">{Number(rating.amount)}</span>
                                </label>
                            ))}
                        </div>
                    )}

                    {filter.type === 'range' && filter.range && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm text-gray-600">
                                <span>₦ {(tempFilters.price as { min?: number })?.min ?? filter.range.min}</span>
                                <span>₦ {(tempFilters.price as { max?: number })?.max ?? filter.range.max}</span>
                            </div>
                            <div className="relative">
                                <div className="flex overflow-hidden w-full">
                                    <PriceRangeSlider
                                        min={filter.range.min}
                                        max={filter.range.max}
                                        minValue={tempFilters.price ? (tempFilters.price as { min?: number })?.min ?? filter.range.min : filter.range.min}
                                        maxValue={tempFilters.price ? (tempFilters.price as { max?: number })?.max ?? filter.range.max : filter.range.max}
                                        onValueChange={(values) => handleTempFilterChange("range", values)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))
            }

            <div className="space-y-3 mt-8">
                <button
                    onClick={handleApplyFilters}
                    className="w-full py-3 bg-[#184193] text-white rounded-md hover:bg-[#18419395] transition-colors"
                >
                    Apply Filter
                </button>
                <button
                    onClick={handleResetFilters}
                    className="w-full py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

