import {RouterProvider} from "react-router-dom";
import {Routes} from "./routes.jsx";
import {CartProvider} from "../contexts/CartContext.jsx";
import {AuthProvider} from "../contexts/AuthContext.jsx";

function App() {
  return (
      <AuthProvider>
          <CartProvider>
              <RouterProvider router={Routes} />
          </CartProvider>
      </AuthProvider>
  )
}

export default App
