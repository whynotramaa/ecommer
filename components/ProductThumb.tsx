import { imageUrl } from '@/lib/imageUrl';
import { Product } from '@/sanity.types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function ProductThumb({ product }: { product: Product }) {
    // Debug info for stock
    console.log(`Debug: ${product.name} - Stock: ${product.stock}, Type: ${typeof product.stock}`);

    // Correct way to check if product is out of stock
    const isOutOfStock = product.stock !== undefined && product.stock !== null && product.stock <= 0;

    // Debug info for out of stock status
    console.log(`${product.name} isOutOfStock: ${isOutOfStock}`);

    return (
        <div className="group flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
            <Link href={`/product/${product.slug?.current}`}>


                <div className="relative aspect-square w-full h-full overflow-hidden">
                    {product.image && (
                        <>
                            {console.log("Image URL:", imageUrl(product.image).url())}
                            <Image
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                src={imageUrl(product.image).url()}
                                alt={product.name || "Product Image"}
                                fill
                                sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                            />
                        </>
                    )}

                    {/* Try disabling this completely to see if it's the cause */}
                    {isOutOfStock && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <span className='text-white font-bold text-lg'>Out Of Stock !!!</span>
                        </div>
                    )}
                </div>

                <div className='p-4'>
                    <h2 className='text-lg font-semibold text-gray-800 truncate'>
                        {product.name}
                    </h2>

                    <p className='mt-2 text-sm text-gray-600 line-clamp-2'>
                        {product.description
                            ?.map((block) =>
                                block._type === "block"
                                    ? block.children?.map((child) => child.text).join("")
                                    : ""
                            )
                            .join("") || "No Descriptions Available"
                        }
                    </p>

                    <p className='mt-2 text-lg font-bold text-gray-900'>
                        ₹{product.price?.toFixed(2)}
                    </p>
                </div>
            </Link>

        </div>
    );
}

export default ProductThumb;