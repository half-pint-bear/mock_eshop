import {Outlet} from "react-router-dom";
import Navbar from "../features/navbar/Navbar.jsx";


export default function MainLayout() {
    return (
        <>
        <Navbar />
        <main className="main">
            <Outlet />
        </main>
        </>
    )
}
