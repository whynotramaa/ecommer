import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

export const searchProductsByName = async (searchParam:string) => {
    const PRODUCT_SEARCH_QUERY = defineQuery(`
        *[
            _type == "product"
            && name match $searchParam
        ] | order(name asc)
        `        
    )

    try {
        const products = await sanityFetch({
            query: PRODUCT_SEARCH_QUERY,
            params:{
                searchParam: `${searchParam}*` // append * for partial match
            }
        })
        return products.data || [] //had missed this one once and GROQ query wasnt made so note it.
    } catch (error) {
        console.log("Error while searching the product", error)
        return []
    }
}