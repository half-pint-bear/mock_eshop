import {useEffect, useState} from "react";
import {apiClientGet} from "../../../services/apiClient.jsx";

export default function useCategoryBySlug(slug) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        try {
            apiClientGet(`/products/category/${slug}`)
                .then(res => setProducts(res.data.products))
        } catch (error) {
            console.log(error);
        }
    }, [slug]);

    return {products};
}
