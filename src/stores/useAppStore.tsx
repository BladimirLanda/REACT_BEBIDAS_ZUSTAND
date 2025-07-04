//STORE
import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { createRecipeSlice, RecipeSliceType } from "./recipeSlice"
import { createFavoriteSlice, FavoriteSliceType } from "./favoriteSlice"
import { createNotificaionSlice, NotificaionSliceType } from "./notificationSlice"
import { createAISlice, AISliceType } from "./aiSlice"

/*
Slice Pattern:
Un slice en Zustand es una forma de dividir el estado en sub-unidades o segmentos más pequeños y organizados. 
Cada slice gestiona un conjunto de propiedades del estado. La idea es modularizar el estado para que se pueda 
gestionar diferentes aspectos de la aplicación sin que se haga todo dentro de un único store global gigante.

create<RecipeSliceType & FavoriteSliceType>: Indica que se está creando un store global en Zustand combinando 
dos slices (RecipeSliceType y FavoriteSliceType) en un solo estado global. 
& es una intersección de tipos en TypeScript (& une los tipos).
*/

//Store
const useAppStore = create<RecipeSliceType & FavoriteSliceType & NotificaionSliceType & AISliceType>()(
    devtools(
        (...a) => ({
            //(...a) Captura los argumento del StoreGlobal (set, get, store)
            ...createRecipeSlice(...a),
            ...createFavoriteSlice(...a),
            ...createNotificaionSlice(...a),
            ...createAISlice(...a)
        })
    )
);

export default useAppStore;