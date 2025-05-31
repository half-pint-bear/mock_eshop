import {useNavigate} from "react-router-dom";

export default function Button({className, to, onClick, children}) {
    const navigate = useNavigate();

    const handleClick = (e) => {
        if(onClick)
            onClick(e);

        if(to)
            navigate(to);
    }

    return (
        <>
            <a className={className} onClick={handleClick}>{children}</a>
        </>
    )
}
