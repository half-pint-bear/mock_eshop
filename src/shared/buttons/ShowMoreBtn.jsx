import {useNavigate} from "react-router-dom";

export default function ShowMoreBtn({to, children}) {
    const navigate = useNavigate();

    const handleClick = () => {
        if(to)
            navigate(to);
    }

    return (
        <>
            <button onClick={handleClick}>{children}</button>
        </>
    )
}
