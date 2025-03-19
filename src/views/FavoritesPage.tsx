//VIEW FAVORITES PAGE
import { useMemo } from "react";
import useAppStore from "../stores/useAppStore"
import DrinkCard from "../components/DrinkCard";

function FavoritesPage() {
  //State
  const { favorites } = useAppStore();

  const hasFavorites = useMemo(() => favorites.length > 0, [favorites]);

  //---VIEW---//
  return (
    <div className="container mx-auto px-3 max-w-screen-xl sm:px-0">
    <h1 className="text-6xl font-extrabold">Favoritos</h1>

    {hasFavorites ? (
        <div className="my-10 grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
            {favorites.map(drink => (
                <DrinkCard key={drink.idDrink} drink={drink} />
            ))}
        </div>
    ) : (
        <p className="my-10 text-center text-2xl">
            Los favoritos se mostrarán aquí
        </p>
    )}
</div>
  )
}

export default FavoritesPage