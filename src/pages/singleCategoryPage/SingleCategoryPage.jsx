import {useParams} from "react-router-dom";
import useCategoryBySlug from "./hooks/useCategoryBySlug.jsx";
import Loader from "../../shared/loader/Loader.jsx";

export default function SingleCategoryPage() {
    const {slug} = useParams();
    const {products} = useCategoryBySlug(slug);

    if (!products)
        return <Loader />

    return (
        <div>
            <h1>{slug}</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.title}</li>
                ))}
            </ul>
        </div>)
}
