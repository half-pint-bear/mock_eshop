import { describe, it, expect, beforeEach, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { CartProvider, useCart } from "./CartContext";
import React from "react";

// Mock localStorage
beforeEach(() => {
    const localStorageMock = (() => {
        let store = {};

        return {
            getItem: vi.fn((key) => store[key] || null),
            setItem: vi.fn((key, value) => {
                store[key] = value.toString();
            }),
            removeItem: vi.fn((key) => {
                delete store[key];
            }),
            clear: vi.fn(() => {
                store = {};
            }),
        };
    })();

    vi.stubGlobal("localStorage", localStorageMock);
});

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

describe("CartContext", () => {
    it("ajoute un article au panier", () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addToCart({ id: 1, title: "Produit A", price: 10 }, 2);
        });

        expect(result.current.cart).toEqual([
            { id: 1, title: "Produit A", price: 10, quantity: 2 },
        ]);
    });

    it("incrémente la quantité si le produit existe déjà", () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addToCart({ id: 1, title: "Produit A", price: 10 }, 1);
            result.current.addToCart({ id: 1, title: "Produit A", price: 10 }, 3);
        });

        expect(result.current.cart).toEqual([
            { id: 1, title: "Produit A", price: 10, quantity: 4 },
        ]);
    });

    it("met à jour la quantité d’un article", () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addToCart({ id: 1, title: "Produit A", price: 10 }, 1);
            result.current.updateCart(1, 5);
        });

        expect(result.current.cart[0].quantity).toBe(5);
    });

    it("empêche de mettre une quantité inférieure à 1", () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addToCart({ id: 1, title: "Produit A", price: 10 }, 3);
            result.current.updateCart(1, 0);
        });

        expect(result.current.cart[0].quantity).toBe(3);
    });

    it("supprime un article du panier", () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addToCart({ id: 1, title: "Produit A", price: 10 }, 1);
            result.current.removeFromCart(1);
        });

        expect(result.current.cart).toHaveLength(0);
    });

    it("vide complètement le panier", () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addToCart({ id: 1, title: "A", price: 10 }, 1);
            result.current.addToCart({ id: 2, title: "B", price: 20 }, 1);
            result.current.clearCart();
        });

        expect(result.current.cart).toHaveLength(0);
    });

    it("calcule correctement le total des articles", () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addToCart({ id: 1, title: "A", price: 10 }, 3); // 3
            result.current.addToCart({ id: 2, title: "B", price: 20 }, 2); // 2
        });

        expect(result.current.totalItems).toBe(5);
    });

    it("sauvegarde les articles dans localStorage", () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addToCart({ id: 1, title: "Produit A", price: 10 }, 1);
        });

        expect(localStorage.setItem).toHaveBeenCalledWith(
            "cart",
            JSON.stringify(result.current.cart)
        );
    });
});
