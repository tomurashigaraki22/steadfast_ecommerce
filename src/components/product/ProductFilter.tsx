// Remove unused import if it exists at the top
// import { useState } from 'react';

// Add type definitions for filter values
type FilterValue = string[] | number[] | { min?: number; max?: number };

export interface FilterOption {
    id: string;
    label: string;
    type: 'checkbox' | 'radio' | 'range';
    options?: Array<{ value: string; label: string }>;
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
    return (
        <div className="w-full max-w-xs bg-white">
            <h2 className="text-xl font-medium mb-6">Filters</h2>

            {filters.map((filter) => (
                <div key={filter.id} className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-medium">{filter.label}</h3>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    {filter.type === 'checkbox' && filter.options && (
                        <div className="space-y-2">
                            {filter.options.map((option) => (
                                <label key={option.value} className="flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={isArrayFilter(activeFilters[filter.id]) && (activeFilters[filter.id] as string[]).includes(option.value)}
                                            onChange={(e) => {
                                                const currentValues = (activeFilters[filter.id] as string[]) || [];
                                                const newValues = e.target.checked
                                                    ? [...currentValues, option.value]
                                                    : currentValues.filter((v: string) => v !== option.value);
                                                onFilterChange(filter.id, newValues);
                                            }}
                                            className="w-4 h-4 border-gray-300 rounded text-blue-600"
                                        />
                                        <span className="ml-3 text-sm text-gray-700">{option.label}</span>
                                    </div>
                                    <span className="text-xs text-blue-600">320</span>
                                </label>
                            ))}
                        </div>
                    )}

                    {filter.id === 'rating' && (
                        <div className="space-y-2">
                            {[5, 4, 3, 2, 1].map((rating) => (
                                <label key={rating} className="flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={isArrayFilter(activeFilters.rating) && (activeFilters.rating as number[]).includes(rating)}
                                            onChange={(e) => {
                                                const currentValues = (activeFilters.rating as number[]) || [];
                                                const newValues = e.target.checked
                                                    ? [...currentValues, rating]
                                                    : currentValues.filter((v: number) => v !== rating);
                                                onFilterChange('rating', newValues);
                                            }}
                                            className="w-4 h-4 border-gray-300 rounded text-blue-600"
                                        />
                                        <div className="ml-3 flex">
                                            {[...Array(rating)].map((_, i) => (
                                                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                    <span className="text-xs text-blue-600">{rating === 5 ? '200' : rating === 4 ? '20' : '0'}</span>
                                </label>
                            ))}
                        </div>
                    )}

                    {filter.id === 'price' && (
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-1">
                                    <label className="text-xs text-gray-500 mb-1 block">Min</label>
                                    <input
                                        type="number"
                                        value={(activeFilters.price as { min?: number })?.min ?? ''}
                                        onChange={(e) => onFilterChange('price', {
                                            ...activeFilters.price,
                                            max: e.target.value === '' ? undefined : Number(e.target.value)
                                        })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                        placeholder="0"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="text-xs text-gray-500 mb-1 block">Max</label>
                                    <input
                                        type="number"
                                        value={(activeFilters.price as { max?: number })?.max ?? ''}
                                        onChange={(e) => onFilterChange('price', {
                                            ...activeFilters.price,
                                            max: e.target.value === '' ? undefined : Number(e.target.value)
                                        })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            <div className="space-y-3 mt-8">
                <button className="w-full py-3 bg-[#184193] text-white rounded-md hover:bg-[#18419395] transition-colors">
                    Apply Filter
                </button>
                <button className="w-full py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                    Reset
                </button>
            </div>
        </div>
    );
};