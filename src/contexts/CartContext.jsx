import {createContext, useContext, useEffect, useReducer} from "react";

const CartContext = createContext();

// Access context hook
export function useCart() {
    return useContext(CartContext);
}

// Cart actions
const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            { const existing = state.items.find(item => item.id === action.payload.id);
            if (existing) {
                // Increments quantity
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + action.payload.quantity }
                            : item
                    ),
                };
            } else {
                return {
                    ...state,
                    items: [...state.items, action.payload],
                };
            } }
        case "REMOVE":
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            };
        case "CLEAR":
            return {
                ...state,
                items: [],
            };
        default:
            return state;
    }
};

//Check if cart stored in localStorage
const getInitialCart = () => {
    const saved = localStorage.getItem("cart");

    return saved ? {items: JSON.parse(saved)} : {items: []};
}

// Context provider with lazy initializer (2nd arg : undefined)
export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, undefined, getInitialCart);

    // Localstorage update
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(state.items));
    }, [state.items]);

    const addToCart = (product, quantity = 1) => {
        dispatch({
            type: "ADD",
            payload: { ...product, quantity },
        });
    };

    const removeFromCart = (id) => {
        dispatch({ type: "REMOVE", payload: id });
    };

    const clearCart = () => {
        dispatch({ type: "CLEAR" });
    };

    const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart: state.items,
                addToCart,
                removeFromCart,
                clearCart,
                totalItems }}>
            {children}
        </CartContext.Provider>
    );
}
