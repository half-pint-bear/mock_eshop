import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginModal from "./LoginModal";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
import * as api from "../../services/apiClient";

// Mock de navigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

// Mock de l'API
vi.mock("../../services/apiClient", () => ({
    apiClientPost: vi.fn()
}));

describe("LoginModal", () => {
    const loginMock = vi.fn();
    const closeMock = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("se connecte avec succès", async () => {
        const user = userEvent.setup();

        // On simule un token de succès
        api.apiClientPost.mockResolvedValue({
            data: {
                accessToken: "FAKE_TOKEN"
            }
        });

        render(
            <AuthContext.Provider value={{ login: loginMock }}>
                <BrowserRouter>
                    <LoginModal onClose={closeMock} redirectTo="/account" />
                </BrowserRouter>
            </AuthContext.Provider>
        );

        // Simuler la saisie
        await user.type(screen.getByPlaceholderText("Nom d'utilisateur"), "testuser");
        await user.type(screen.getByPlaceholderText("Mot de passe"), "password123");

        // Cliquer sur le bouton de connexion
        await user.click(screen.getByRole("button", { name: "Se connecter" }));

        // Vérifications
        expect(api.apiClientPost).toHaveBeenCalledWith("/auth/login", {
            username: "testuser",
            password: "password123",
        });

        expect(loginMock).toHaveBeenCalledWith("FAKE_TOKEN");
        expect(closeMock).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith("/account");
    });

    it("affiche une erreur si les identifiants sont incorrects", async () => {
        const user = userEvent.setup();

        api.apiClientPost.mockRejectedValue(new Error("401"));

        render(
            <AuthContext.Provider value={{ login: loginMock }}>
                <BrowserRouter>
                    <LoginModal onClose={closeMock} />
                </BrowserRouter>
            </AuthContext.Provider>
        );

        await user.type(screen.getByPlaceholderText("Nom d'utilisateur"), "wrong");
        await user.type(screen.getByPlaceholderText("Mot de passe"), "wrongpass");
        await user.click(screen.getByRole("button", { name: "Se connecter" }));

        expect(await screen.findByText("Wrong credentials")).toBeInTheDocument();
        expect(loginMock).not.toHaveBeenCalled();
        expect(closeMock).not.toHaveBeenCalled();
        expect(mockNavigate).not.toHaveBeenCalled();
    });
});
