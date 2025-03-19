//COMPONENT DRINK-CARD
import useAppStore from "../stores/useAppStore"
import { Drink } from "../types"

//Type
type DrinkCardProps = {
    drink: Drink
}

function DrinkCard( { drink } : DrinkCardProps ) {
    //State
    const { selectRecipe } = useAppStore();

    //---VIEW---//
    return (
        <div className="border shadow-lg">
            <div className="overflow-hidden">
                <img src={drink.strDrinkThumb} alt={`Imagen de ${drink.strDrink}`} 
                className="transition-transform hover:scale-125 hover:rotate-2" />
            </div>

            <div className="p-5">
                <h2 className="text-2xl font-black truncate">{drink.strDrink}</h2>
                <button type="button" className="w-full font-bold mt-5 p-3 text-lg 
                text-white bg-orange-400 hover:bg-orange-500"
                onClick={() => selectRecipe(drink.idDrink)}>
                    Ver Receta
                </button>
            </div>
        </div>
    )
}

export default DrinkCard