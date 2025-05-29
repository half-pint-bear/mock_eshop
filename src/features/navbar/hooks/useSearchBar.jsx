import {useEffect, useState} from "react";
import {apiClientGet} from "../../../services/apiClient.jsx";

export default function useSearchBar(query, minLength = 3) {

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const startSearch = query.trim().length >= minLength;

        if(!startSearch) {
            setResults([]);
            return;
        }

        const fetchProductsByString = setTimeout(async () => {
            try {
                setLoading(true);
                const res = await apiClientGet(`/products/search?q=${query}`);

                setResults(Array.isArray(res.data.products) ? res.data.products : []);
            } catch (error) {
                console.error('Search error : ', error);
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 300)
        return  () => clearTimeout(fetchProductsByString);

    }, [query, minLength]);

    return { results, loading };
}
