import { createContext, useContext, useReducer } from "react";

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

// Cart initial state
const initialState = {
    items: [], // item : { id, title, price, quantity }
};

// Context provider
export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);

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
        <CartContext.Provider value={{ cart: state.items, addToCart, removeFromCart, clearCart, totalItems }}>
            {children}
        </CartContext.Provider>
    );
}
