import {useEffect, useState} from "react";
import {apiClientGet} from "../../../services/apiClient.jsx";

export default function useProductById(id){
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        try {
            apiClientGet(`/products/${id}`)
                .then((response) => {
                    console.log(response.data);
                    setProduct(response.data)
                });
        }catch(error){
            console.error(error);
        }
    }, [id])

    return {product};
}
