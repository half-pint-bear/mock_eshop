// eslint-disable-next-line no-unused-vars
/* global expect, describe, test, vi */
import { describe, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import AllCategoriesPage from './AllCategoriesPage';
import * as useAllCategoriesHook from './hooks/useAllCategories';
import { BrowserRouter } from 'react-router-dom';

const renderComponent = () => {
    render(
        <BrowserRouter>
            <AllCategoriesPage />
        </BrowserRouter>
    );
};

describe('AllCategoriesPage', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('affiche le loader pendant le chargement', () => {
        vi.spyOn(useAllCategoriesHook, 'default').mockReturnValue({
            categories: [],
            loading: true,
            error: null,
        });

        renderComponent();

        expect(screen.getByText(/chargement en cours/i)).toBeInTheDocument();
    });

    it("affiche un message d'erreur en cas d'échec", () => {
        vi.spyOn(useAllCategoriesHook, 'default').mockReturnValue({
            categories: [],
            loading: false,
            error: new Error('Erreur API'),
        });

        renderComponent();

        expect(screen.getByText(/erreur lors du chargement/i)).toBeInTheDocument();
    });

    it('affiche les catégories une fois chargées', () => {
        vi.spyOn(useAllCategoriesHook, 'default').mockReturnValue({
            categories: [
                { name: 'beauty', slug: 'beauty' },
                { name: 'furniture', slug: 'furniture' },
                { name: 'fragrances', slug: 'fragrances' },
            ],
            loading: false,
            error: null,
        });

        renderComponent();

        expect(screen.getByText(/toutes les catégories/i)).toBeInTheDocument();
        expect(screen.getByText(/beauty/i)).toBeInTheDocument();
        expect(screen.getByText(/furniture/i)).toBeInTheDocument();
        expect(screen.getByText(/fragrances/i)).toBeInTheDocument();
    });
});
