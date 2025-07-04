//COMPONENT HEADER
import { useState, useEffect, useMemo, ChangeEvent, FormEvent } from "react";
import { Link, NavLink, useLocation } from "react-router-dom"
import useAppStore from "../stores/useAppStore";

/*
<Link />: Este componente en React Router reemplaza a la etiqueta HTML <a> 
y permite la navegación entre páginas sin recargar la aplicación.
-to="/": Especifica la ruta a la que queremos navegar (/ en este caso, que es la página principal).
-Inicio-Img: Es el texto visible o imagen en pantalla, que el usuario puede hacer clic para navegar.

Si se usurá un enlace normal con <a href="/">Inicio</a>, el navegador haría una carga completa de la página.
En cambio, con <Link>, React Router maneja la navegación internamente, lo que hace que el cambio de página 
sea instantáneo sin recargar la aplicación.

<NavLink />: Tiene la ventaja de poder aplicar estilos automáticamente cuando la ruta está activa. Se utiliza
el la función className( ( {isActive} ) => {} )

useLocation: Es un hook de React Router que permite acceder a la ubicación actual de la URL 
en la aplicación. Básicamente, da acceso al objeto location, que contiene detalles sobre:
-pathname: La ruta actual (/home, /about). 
-search: Los parámetros de consulta de la URL (?id=123). 
-hash: El fragmento de la URL (#section1). 
-state: El estado opcional que puede haberse pasado cuando se navega a la ruta.
Cuando usar:
1️) Rutas dinámicas o dependientes de la URL: Si tu componente necesita reaccionar 
a los cambios en la URL, como mostrar datos basados en los parámetros de la ruta.
2️) Navegación condicional: Si quieres realizar algo específico dependiendo de la 
ruta o los parámetros, como mostrar un mensaje diferente si estás en una ruta específica.
*/

function Header() {
  //Router
  const { pathname } = useLocation();

  //State
  const [ searchFilters, setSearchFilters ] = useState({
    ingredient: '',
    category: ''

  });
  const { categories, fecthCategories, searchRecipes, showNotification } = useAppStore();

  useEffect(() => {
    fecthCategories();
  }, []);

  const isHome = useMemo(() => pathname === "/", [pathname]);

  //Eventos
  const handleChange = (e : ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(Object.values(searchFilters).includes('')) {
      showNotification({
        text: 'Todos los campos son obligatorios',
        error: true
      });
      return;
    }

    searchRecipes(searchFilters);
  }

  //---VIEW---//
  return (
    <header className={isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800'}> {/*Tailwind Extends*/}
        <div className="mx-auto container px-5 py-16 max-w-screen-xl">
            <div className="flex justify-between items-center">
                <div>
                    <Link to="/">
                      <img src="/logo.svg" alt="logo_tipo" className="w-36" />
                    </Link>
                </div>

                <nav className="text-xl sm:text-2xl flex flex-col gap-4 sm:flex-row">
                  <NavLink to="/" className={( {isActive} ) =>
                    isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold hover:text-orange-200'
                  }>
                    Inicio
                  </NavLink>

                  <NavLink to="/favoritos" className={( {isActive} ) =>
                    isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold hover:text-orange-200'
                  }>
                    Favoritos
                  </NavLink>

                  <NavLink to="/generate" className={( {isActive} ) =>
                    isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold hover:text-orange-200'
                  }>
                    Generar IA✍️
                  </NavLink>
                </nav>
            </div>

            {isHome && (
              <form className="w-full my-32 p-10 rounded-lg shadow space-y-6 bg-orange-400 md:w-1/2"
              onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <label htmlFor="ingredient" className="block text-white uppercase font-extrabold text-lg">
                    Nombre o Ingrediente
                  </label>

                  <input 
                  type="text" 
                  id="ingredient"
                  name="ingredient"
                  placeholder="nombre o ingrediente (vodka, tequila, coffe)"
                  className="p-3 w-full rounded-lg focus:outline-none"
                  value={searchFilters.ingredient}
                  onChange={handleChange}
                  />
                </div>

                <div className="space-y-4">
                  <label htmlFor="category" className="block text-white uppercase font-extrabold text-lg">
                    Categoría
                  </label>

                  <select
                  id="category"
                  name="category"
                  className="p-3 w-full rounded-lg focus:outline-none"
                  value={searchFilters.category}
                  onChange={handleChange}
                  >
                    <option value="">-- Seleccione --</option>
                    {categories.drinks.map(category => (
                      <option key={category.strCategory} value={category.strCategory}>
                        {category.strCategory}
                      </option>
                    ))}
                  </select>
                </div>

                <input 
                type="submit" 
                value="Buscar Recetas" 
                className="w-full p-2 rounded-lg uppercase font-extrabold text-white cursor-pointer
                bg-orange-800 hover:bg-orange-900" />
              </form>
            )}
        </div>
    </header>
  )
}

export default Header