import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllCategories = async() => {
    const ALL_CATEGORY_QUERY = defineQuery(`
            *[
                _type == "category"
            ] | order(name asc )
        `)

try {
    
    const categories = await sanityFetch({
        query: ALL_CATEGORY_QUERY,
    });

    return categories.data || [];

} catch (error) {
    console.log("Error ehile fetching the categories:", error)
    
}
}