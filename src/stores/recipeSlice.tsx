//SLICE RECIPE
import { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipes } from "../services/RecipeService"
import type { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types"

/*
StateCreator: Es un tipo de TypeScript que se utiliza para definir la forma 
en que se creará un slice de estado. Básicamente, ayuda a tipar correctamente 
la función que define el estado y sus acciones.
-Mejor autocompletado en el editor (VS Code, WebStorm, etc.).
-Evita errores de tipado al definir el estado.
-Asegura que los slices sean compatibles cuando se combinan en un store global.
*/

//Type
export type RecipeSliceType = {
    categories: Categories,
    drinks : Drinks,
    selectedRecipe: Recipe,
    modal: boolean,
    fecthCategories: () => Promise<void>,
    searchRecipes: (filters : SearchFilter) => Promise<void>,
    selectRecipe: (id : Drink['idDrink']) => Promise<void>,
    closeModal: () => void;
}

//Slice
export const createRecipeSlice : StateCreator<RecipeSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks : {
        drinks: []
    },
    /*
    as (Type Assertion): Es una forma de decirle explícitamente a TypeScript que trate 
    un valor como un tipo específico. No realiza ninguna conversión de datos, solo 
    le indica al compilador que confíe en que el valor tiene el tipo declarado.
    En este caso se le dice a TypeScript que selectedRecipe es del tipo Recipe, 
    aunque ahora este vacio
    */
    selectedRecipe: {} as Recipe, 
    modal: false,

    fecthCategories: async () => {
        const categoriesResponse = await getCategories();
        set({
            categories: categoriesResponse
        })
    },

    searchRecipes: async (filters) => {
        const drinksResponse = await getRecipes(filters);
        set({
            drinks: drinksResponse
        })
    },

    selectRecipe: async (id) => {
       const recipeResponse =  await getRecipeById(id);
       set({
          selectedRecipe: recipeResponse,
          modal: true
       })
    },

    closeModal: () => {
        set({
            selectedRecipe: {} as Recipe,
            modal: false
        })
    }
});
