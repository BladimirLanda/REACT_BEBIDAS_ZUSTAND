//SLICE AI
import { StateCreator } from "zustand"
import { generateRecipe } from "../services/AIService";

//Type
export type AISliceType = {
    recipe: string,
    isGenerating: boolean,
    generateRecipe: (prompt : string) => Promise<void>
}

//Store
export const createAISlice : StateCreator<AISliceType> = (set) => ({
    recipe: '',
    isGenerating: false,

    generateRecipe: async (prompt) => {
        //Limpieza
        set({
            recipe: '',
            isGenerating: true
        })

        const data = await generateRecipe(prompt); 

        for await (let textPart of data) {
            set((state => ({
                recipe: state.recipe + textPart
            })));
        }

        set({
            isGenerating: false
        })
    }
});