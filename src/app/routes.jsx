import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import HomePage from "../pages/homepage/HomePage.jsx";
import SingleCategoryPage from "../pages/singleCategoryPage/SingleCategoryPage.jsx";
import SingleProductPage from "../pages/singleProductPage/SingleProductPage.jsx";
import CartPage from "../pages/cartPage/CartPage.jsx";
import AllProductsPage from "../pages/allProductsPage/AllProductsPage.jsx";
import AllCategoriesPage from "../pages/allCategoriesPage/AllCategoriesPage.jsx";

export const Routes = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: "/category/:slug",
                element: <SingleCategoryPage />
            },
            {
                path: "/products/:id",
                element: <SingleProductPage />
            },
            {
                path: "/cart",
                element: <CartPage />
            },
            {
                path: "/products/all",
                element: <AllProductsPage />
            },
            {
                path: "/categories/all",
                element: <AllCategoriesPage />
            }
        ]
    }
])


