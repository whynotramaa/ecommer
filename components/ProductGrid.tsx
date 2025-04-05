"use client";

import { Product } from "@/sanity.types";
import { AnimatePresence, motion } from "framer-motion";
import ProductThumb from "./ProductThumb";

function ProductGrid({ products }: { products: Product[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {(Array.isArray(products) ? products : []).length > 0 ? (
                (Array.isArray(products) ? products : []).map((product) => {
                    console.log("Rendering product:", product); // Log each product
                    return (
                        <AnimatePresence key={product._id}>
                            <motion.div
                                layout
                                initial={{ opacity: 0.2 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <ProductThumb key={product._id} product={product} />
                            </motion.div>
                        </AnimatePresence>
                    );
                })
            ) : (
                <p>No products to display. </p>
            )}
        </div>
    );
}

export default ProductGrid;