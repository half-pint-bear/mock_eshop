import { createContext, useContext, useEffect, useState } from "react";
import {apiClientGet} from "../services/apiClient.jsx";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            // Get user info through token
            apiClientGet("/auth/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                credentials: "include"
            })
                .then(res => {

                    setUser(res.data)
                })
                .catch((error) => {
                    console.error("/auth/me error : ", error);
                    if(error.response) {
                        console.error("Details  ", error.response.status, error.response.data);
                    }
                    setUser(null)
                });
        } else {
            localStorage.removeItem("token");
            setUser(null);
        }
    }, [token]);

    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    }
    const logout = () => {
        setToken(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
