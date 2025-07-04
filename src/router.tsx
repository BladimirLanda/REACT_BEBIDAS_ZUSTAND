//ROUTER
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom" //Enrutador React: npm i react-router-dom
import Layout from "./layouts/Layout"
import NotFound from "./views/NotFound"

/*
Performance
Cargar componentes de forma diferida (Lazy Loading o carga diferida). Esto mejora el rendimiento 
porque React solo carga cada página cuando es necesario, en lugar de incluir todo en el bundle inicial
(Archivo JavaScript que el navegador descarga cuando cargas una aplicación web en React).

1) No carga todas las páginas al inicio.
2) Solo descarga y renderiza una página cuando el usuario la necesita.
3) Reduce el tiempo de carga inicial de la app.

-lazy() – Carga Diferida de Componentes. La función lazy() permite cargar componentes solo cuando 
se necesiten, en lugar de cargarlos todos al inicio.

-<Suspense /> – Pantalla de Carga Mientras se Carga el Componente. Cuando se usa lazy(), React no 
puede renderizar inmediatamente el componente porque se está cargando de forma asíncrona. Para 
manejar esto, usamos Suspense, que muestra un mensaje (fallback) o pantalla de carga mientras 
React obtiene el componente.
*/
const IndexPage = lazy(() => import('./views/IndexPage'));
const FavoritesPage = lazy(() => import('./views/FavoritesPage'));
const GenerateAI = lazy(() => import('./views/GenerateAI'));

/*
React Router es una biblioteca que permite manejar la navegación y el enrutamiento en aplicaciones de React.
-Navegar entre "páginas" (componentes) sin recargar la app.
-Manejar rutas dinámicas (/producto/:id).
-Crear navegación basada en estados (por ejemplo, mostrar ciertos componentes solo si el usuario está autenticado).

Algunos componentes principales son:
-<BrowserRouter>: Envoltor de la aplicación para habilitar React Router.
-<Routes>: Envuelve todas las rutas de la app. Solo permite renderizar una ruta a la vez.
-<Route>: Define cada ruta específica dentro de <Routes>.
    -path="": Especifica la URL que activará esta ruta.
    -element={}: Define qué componente se mostrará cuando la URL coincida con path.
    -path="*": Captura cualquier otra URL no definida (página 404).

-index: prop index indica que esa ruta es la predeterminada dentro de un conjunto de rutas anidadas. 
Es decir, si no se especifica una ruta exacta, se renderizará la que tenga index.
*/

function AppRouter() {
  //Enrutador
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Suspense fallback="cargando..."> <IndexPage /> </Suspense>} />
                <Route path="/favoritos" element={<Suspense fallback="cargando..."> <FavoritesPage /> </Suspense>} />
                <Route path="/generate" element={<Suspense fallback="cargando..."> <GenerateAI /> </Suspense>} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter;