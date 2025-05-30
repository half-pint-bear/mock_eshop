import {useParams} from "react-router-dom";
import useProductById from "./hooks/useProductById.jsx";
import Loader from "../../shared/components/loader/Loader.jsx";


export default function SingleProductPage() {
    const {id} = useParams();
    const {product} = useProductById(id);

    if (!product) {
        return <Loader />;
    }
    return (<div>
        <h1>{product.title}</h1>
    </div>)
}
