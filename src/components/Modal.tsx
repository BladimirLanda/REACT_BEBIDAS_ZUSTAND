//COMPONENT MODAL
import useAppStore from '../stores/useAppStore'
import { Recipe } from '../types'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, JSX } from 'react'

/*
@headlessui/react es una librería de componentes accesibles creada por el equipo de Tailwind CSS. 
Se usa para construir interfaces interactivas en React sin preocuparse por los estilos, ya que solo 
proporciona la lógica y el comportamiento.
-Componentes sin estilos → Tú decides cómo se ven usando CSS o Tailwind.
-Accesibilidad incorporada → Cumple con estándares de accesibilidad (aria-* y manejo del teclado).
-Compatibilidad con React y Vue → Disponible para ambos frameworks.
https://headlessui.com/react/popover
*/

export default function Modal() {
    //State
    const { selectedRecipe, modal, closeModal, handleClickRecipe, favoriteExists, showNotification } = useAppStore();

    //Funciones
    const renderIngredients = () => {
        //JSX.Element: Tipo de dato que representa un elemento JSX en TypeScript.
        const ingredients : JSX.Element[] = []; 

        for (let i = 0; i <= 6; i++) {
            //as keyof: Se usa para indicar que la clave generada dinámicamente existe en el tipo Recipe.
            const ingredient  = selectedRecipe[`strIngredient${i}` as keyof Recipe];
            const measure  = selectedRecipe[`strMeasure${i}` as keyof Recipe];

            if(ingredient && measure) {
                ingredients.push(
                    <li key={i} className='text-lg font-normal'>
                        {ingredient} - {measure}
                    </li>
                );
            }
        }

        return <ul className='list-inside list-disc'>{ingredients}</ul>;
    }

    //---VIEW---//
    return (
        <>
        <Transition appear show={modal} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-70" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                                <Dialog.Title as="h3" className="text-gray-900 text-4xl font-extrabold my-5 text-center">
                                    {selectedRecipe.strDrink}
                                </Dialog.Title>

                                <img src={selectedRecipe.strDrinkThumb} alt={`Imagen ${selectedRecipe.strDrink}`} 
                                className='mx-auto w-96'/>

                                <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                                    Ingredientes y Cantidades
                                </Dialog.Title>
                                    {renderIngredients()}
                                <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                                    Instrucciones
                                </Dialog.Title>
                                    <p className='text-lg'>{selectedRecipe.strInstructions}</p>

                                    <div className='mt-5 flex flex-col justify-between gap-4 sm:flex-row'>
                                        <button type='button' className='w-full p-3 font-bold rounded 
                                        uppercase text-white shadow bg-gray-600 hover:bg-gray-500'
                                        onClick={closeModal}>
                                            Cerrar
                                        </button>

                                        <button type='button' className='w-full p-3 font-bold rounded 
                                        uppercase text-white shadow bg-orange-600 hover:bg-orange-500'
                                        onClick={() => {
                                            handleClickRecipe(selectedRecipe);
                                            closeModal();

                                            if(favoriteExists(selectedRecipe.idDrink)) {
                                                showNotification({
                                                    text: 'Se agregó a Favoritos',
                                                    error: false
                                                })
                                            } else {
                                                showNotification({
                                                    text: 'Se eliminó de Favoritos',
                                                    error: false
                                                })
                                            }
                                        }}>
                                            {favoriteExists(selectedRecipe.idDrink) 
                                            ? 'Eliminar Favorito' : 'Guardar Favorito'}
                                        </button>
                                    </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
        </>
    )
}