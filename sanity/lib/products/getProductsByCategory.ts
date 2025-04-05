import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductsByCategory = async (categorySlug: string) => {
    const PRODUCT_BY_CATEGORY = defineQuery(
        `
        *[
        _type == "product" && 
        references(*[
            _type == "category" && slug.current == $categorySlug
        ]._id)
        ] | order(name asc)
        `
    );

    try {
        const products = await sanityFetch({
            query: PRODUCT_BY_CATEGORY,
            params: {
                categorySlug,
            },
        });
        return products.data || []; // Return array of products or empty array
    } catch (error) {
        console.log("Error while opening Product by Category page", error);
        return [];
    }
};