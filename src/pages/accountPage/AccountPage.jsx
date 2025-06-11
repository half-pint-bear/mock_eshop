import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import Loader from "../../shared/components/loader/Loader.jsx";

export default function AccountPage() {
    const { user } = useContext(AuthContext);

    if (!user)
        return <Loader  />

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Bienvenue {user.firstName} !</h1>
            <img
                src={user.image}
                alt="Avatar"
                style={{
                    borderRadius: "50%",
                    width: "100px",
                    height: "100px",
                    marginTop: "1rem"
                }}
            />
            <p>email : {user.email}</p>
        </div>
    );
}
