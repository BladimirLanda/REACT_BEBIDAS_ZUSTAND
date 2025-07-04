//VIEW INDEX
import { useMemo } from "react";
import useAppStore from "../stores/useAppStore"
import DrinkCard from "../components/DrinkCard";

function IndexPage() {
    //State
    const { drinks } = useAppStore();

    const hasDrinks = useMemo(() => drinks.drinks.length > 0, [drinks]);

    //---VIEW---//
    return (
        <div className="container mx-auto px-3 max-w-screen-xl sm:px-0">
            <h1 className="text-6xl font-extrabold">Recetas</h1>

            {hasDrinks ? (
                <div className="my-10 grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
                    {drinks.drinks.map(drink => (
                        <DrinkCard key={drink.idDrink} drink={drink} />
                    ))}
                </div>
            ) : (
                <p className="my-10 text-center text-2xl">
                    No hay resultados, utiliza el formulario
                </p>
            )}
        </div>
    )
}

export default IndexPage;