//SLICE FAVORITE
import { StateCreator } from "zustand"
import { Recipe } from "../types"

/*
get(): Este método se usa dentro de la función create para obtener el estado actual 
del store sin necesidad de usar el llamado al Store(). El retorno del get() es un objeto
con los estados actuales.
*/

//Type
export type FavoriteSliceType = {
    favorites: Recipe[],
    handleClickRecipe: (recipe : Recipe) => void,
    loadFromStorage: () => void,
    favoriteExists : (id: Recipe['idDrink']) => boolean;
}

//Store
export const createFavoriteSlice : StateCreator<FavoriteSliceType> = (set, get) => ({
    favorites: [],

    handleClickRecipe: (recipe) => {
        if(get().favoriteExists(recipe.idDrink)) {
            set({
                favorites: [ ...get().favorites.filter(favorite => favorite.idDrink !== recipe.idDrink) ]
            });
        } else {
            set({
                favorites: [ ...get().favorites, recipe ]
            });
        }

        localStorage.setItem('favorites', JSON.stringify(get().favorites));
    },

    loadFromStorage: () => {
        const storeFavorites = localStorage.getItem('favorites');

        if(storeFavorites) {
            set({
                favorites: JSON.parse(storeFavorites)
            })
        }
    },

    favoriteExists: (id) => {
        const hasRecipe = get().favorites.some(favorite => favorite.idDrink === id);
        return hasRecipe;
    }
});