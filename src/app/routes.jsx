import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import HomePage from "../pages/homePage/HomePage.jsx";
import SingleCategoryPage from "../pages/singleCategoryPage/SingleCategoryPage.jsx";
import SingleProductPage from "../pages/singleProductPage/SingleProductPage.jsx";
import CartPage from "../pages/cartPage/CartPage.jsx";
import AllProductsPage from "../pages/allProductsPage/AllProductsPage.jsx";
import AllCategoriesPage from "../pages/allCategoriesPage/AllCategoriesPage.jsx";
import AccountPage from "../pages/accountPage/AccountPage.jsx";
import CheckoutPage from "../pages/checkoutPage/CheckoutPage.jsx";
import ContactPage from "../pages/contactPage/ContactPage.jsx";

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
            },
            {
                path: "/account",
                element: <AccountPage />
            },
            {
                path: "/checkout",
                element: <CheckoutPage />
            },
            {
                path: "/contact",
                element: <ContactPage />
            }
        ]
    }
])


