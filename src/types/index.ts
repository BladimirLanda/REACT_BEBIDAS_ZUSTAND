//TYPES
import { z } from "zod"
import { CategoriesAPIResponseSchema, DrinkAPIResponse, DrinksAPIResponse, RecipeAPIResponseSchema, SearchFilterSchema } from "../schema/recipes-schemas"

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>;

export type SearchFilter = z.infer<typeof SearchFilterSchema>;

export type Drinks = z.infer<typeof DrinksAPIResponse>;

export type Drink = z.infer<typeof DrinkAPIResponse>;

export type Recipe = z.infer<typeof RecipeAPIResponseSchema>;

export type Notification = {
    text: string,
    error: boolean,
    show: boolean
}