import {useCallback, useEffect, useState} from "react";
import {apiClientGet} from "../../../services/apiClient.jsx";
import useCategories from "../../singleProductPage/hooks/useCategories.jsx";

export default function useCategoryBySlug(slug) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cat, setCategory] = useState('');
    const {getNameBySlug, catLoading} = useCategories();

    //Loading products by category
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const res = await apiClientGet(`/products/category/${slug}`);
                setProducts(res.data.products);
                //setCategory(getCatBySlug(slug));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [slug]);

    //Get category name from slug
    useEffect(() => {
        if(!catLoading) {
            const catName = getNameBySlug(slug);
            setCategory(catName);
        }
    }, [catLoading, getNameBySlug, slug]);

    return {products, cat, loading};
}
