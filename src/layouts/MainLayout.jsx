import {Outlet} from "react-router-dom";
import Navbar from "../features/navbar/components/Navbar.jsx";


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
