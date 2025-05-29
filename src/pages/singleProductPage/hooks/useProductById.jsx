import {useEffect, useState} from "react";
import {apiClientGet} from "../../../services/apiClient.jsx";

export default function useProductById(id){
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const res = apiClientGet(`/products/${id}`);
            setProduct(res.data)
            setLoading(false);
        }catch(error){
            console.error(error);
        }
    }, [id])

    return {product, loading};
}
