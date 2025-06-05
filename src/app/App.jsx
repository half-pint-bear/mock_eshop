import {RouterProvider} from "react-router-dom";
import {Routes} from "./routes.jsx";
import {CartProvider} from "../contexts/CartContext.jsx";

function App() {
  return (
      <CartProvider>
        <RouterProvider router={Routes} />
      </CartProvider>
  )
}

export default App
