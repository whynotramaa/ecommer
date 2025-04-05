"use client";

import { Category, Product } from '@/sanity.types';
import React from 'react';
import ProductGrid from './ProductGrid';
import CategorySelectorComponent from './ui/category-selector';

interface ProductViewProps {
    products: Product[];
    categories: Category[];
}

function ProductsView({ products, categories }: ProductViewProps) {
    return (
        <div>
            <div>ProductsView</div>
            <div className="w-full sm:w-[200px]">
                <CategorySelectorComponent categories={categories} />
            </div>
            <div className="flex-1">
                <div>
                    <ProductGrid products={products} />
                    <hr className="w-1/2 sm:w-3/4 mt-5" />
                </div>
            </div>
        </div>
    );
}

export default ProductsView;