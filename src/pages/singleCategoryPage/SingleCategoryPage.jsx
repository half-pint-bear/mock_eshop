import {useParams} from "react-router-dom";
import useCategoryBySlug from "./hooks/useCategoryBySlug.jsx";

export default function SingleCategoryPage() {
    const {slug} = useParams();
    const {products} = useCategoryBySlug(slug);

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
