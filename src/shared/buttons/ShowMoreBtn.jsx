import {useNavigate} from "react-router-dom";
import styles from "../buttons/ShowMoreBtn.module.css"

export default function ShowMoreBtn({to, children}) {
    const navigate = useNavigate();

    const handleClick = () => {
        if(to)
            navigate(to);
    }

    return (
        <>
            <a className={styles.showMoreBtn} onClick={handleClick}>{children}</a>
        </>
    )
}
