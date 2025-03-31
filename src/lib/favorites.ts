import Cookies from 'js-cookie';

const FAVORITES_COOKIE_KEY = 'user_favorites';

// interface FavoriteProduct {
//     productId: string;
//     dateAdded: string;
// }

export const FavoritesHelper = {
    getAllFavorites: (): string[] => {
        const favorites = Cookies.get(FAVORITES_COOKIE_KEY);
        return favorites ? JSON.parse(favorites) : [];
    },

    addToFavorites: (productId: string): void => {
        const currentFavorites = FavoritesHelper.getAllFavorites();
        if (!currentFavorites.includes(productId)) {
            currentFavorites.push(productId);
            Cookies.set(FAVORITES_COOKIE_KEY, JSON.stringify(currentFavorites), {
                expires: 365 * 10,  
                sameSite: 'strict'
            });
        }
    },

    removeFromFavorites: (productId: string): void => {
        const currentFavorites = FavoritesHelper.getAllFavorites();
        const updatedFavorites = currentFavorites.filter(id => id !== productId);
        Cookies.set(FAVORITES_COOKIE_KEY, JSON.stringify(updatedFavorites), {
            expires: 365 * 10,
            sameSite: 'strict'
        });
    },

    isProductFavorite: (productId: string): boolean => {
        const favorites = FavoritesHelper.getAllFavorites();
        return favorites.includes(productId);
    }
};