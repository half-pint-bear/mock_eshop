import {useNavigate} from "react-router-dom";

export default function Button({className, to, children}) {
    const navigate = useNavigate();

    const handleClick = () => {
        if(to)
            navigate(to);
    }

    return (
        <>
            <a className={className} onClick={handleClick}>{children}</a>
        </>
    )
}
