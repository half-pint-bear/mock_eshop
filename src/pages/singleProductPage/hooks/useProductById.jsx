import {useEffect, useState} from "react";
import {apiClientGet} from "../../../services/apiClient.jsx";

export default function useProductById(id){
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            setLoading(true); // au cas où id changerait
            apiClientGet(`/products/${id}`)
                .then(res => {
                    setProduct(res.data);
                    setLoading(false);
                })
        }catch(error){
            console.error(error);
        }
    }, [id])

    return {product, loading};
}
