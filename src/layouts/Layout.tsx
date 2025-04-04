//LAYOUT
import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import useAppStore from "../stores/useAppStore"
import Header from "../components/Header"
import Modal from "../components/Modal"
import Notification from "../components/Notification"

/*
<Outlet /> es un componente especial en React que sirve como un marcador de posición para 
renderizar componentes hijos dentro de un layout principal. Cuando se tienen rutas anidadas, 
indica dónde se renderizará el contenido de las rutas hijas dentro del layout principal.
*/

function Layout() {
  //State
  const { loadFromStorage } = useAppStore();

  useEffect(() => {
    loadFromStorage();
  }, []);

  //---VIEW---//
  return (
    <>
        <Header />

        <main className="container mx-auto py-16">
            <Outlet />
        </main>

        <Modal />

        <Notification />
    </>
  )
}

export default Layout