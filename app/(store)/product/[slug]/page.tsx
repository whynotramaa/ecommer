import AddToBasketButton from '@/components/AddToBasketButton';
import { imageUrl } from '@/lib/imageUrl';
import { getProductsBySlug } from '@/sanity/lib/products/getProductsBySlug';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const dynamic = "force-static";
export const revalidate = 60



async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductsBySlug(slug);

  console.log(
    crypto.randomUUID().slice(0,5)+
    `rendered for product page cache for ${slug}`
  );

  if (!product) {
    return notFound();
  }

  // Randomly generate a rating between 3.5 and 5.0

  const isOutOfStock = product.stock !== undefined && product.stock !== null && product.stock <= 0;


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12">
      <div className="max-w-4xl w-full mx-4 bg-white rounded-xl shadow-md p-6 md:p-8 flex flex-col md:flex-row gap-8">
        {/* Smaller Product Image */}
        <div className="relative w-full md:w-80 h-80 flex-shrink-0 overflow-hidden rounded-lg shadow-sm">
          {product.image ? (
            <Image
              src={imageUrl(product.image).url()}
              alt={product.name ?? "Product image"}
              width={320} // Slightly smaller for balance
              height={320}
              className="object-cover transition-transform duration-500 hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
              No Image Available
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col space-y-4">
          {/* Product Name */}
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
            {product.name}
          </h1>

          {/* Rating */}
          

          {/* Description */}
          <div className="text-gray-700 text-base leading-relaxed">
            {Array.isArray(product.description) ? (
              <PortableText value={product.description} />
            ) : (
              <p>{product.description || "No description available."}</p>
            )}
          </div>

          <div className="mt-6">
            <AddToBasketButton product={product} disabled={isOutOfStock} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductPage;