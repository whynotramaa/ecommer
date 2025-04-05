import ProductGrid from "@/components/ProductGrid";
import { searchProductsByName } from "@/sanity/lib/products/searchProductsByName";

async function SearchPage({searchParams,}: {searchParams:Promise<{query: string;}>; }) {
    const {query } = await searchParams;
    const products = await searchProductsByName(query);
    
    if(!products.length){
        return(
            <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
                <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-4xl">
                    <h1 className="font-bold text-3xl mb-6 text-center">
                        No products found for: {query}
                    </h1>
                    <p className="text-center text-gray-600">
                        Try searching with differnet keywords
                    </p>
                </div>
            </div>
        )
    }

    return (
    <div className="flex flex-col items-center justify-top min-h-screen p-4 bg-gray-100">
        <div className="rounded-lg bg-white p-8 shadow-md w-full max-w-7xl mt-5">
            <h1 className="font-bold text-3xl text-center mb-6">
                Search Results for: {query}
            </h1>
                <ProductGrid products={products} />
        </div>
    </div>
    
)
}

export default SearchPage