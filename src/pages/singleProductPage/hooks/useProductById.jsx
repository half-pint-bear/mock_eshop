import {useEffect, useState} from "react";
import {apiClientGet} from "../../../services/apiClient.jsx";

export default function useProductById(id){
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await apiClientGet(`/products/${id}`);
                setProduct(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    return {product, loading};
}
