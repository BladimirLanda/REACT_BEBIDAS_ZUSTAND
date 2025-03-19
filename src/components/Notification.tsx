//COMPONENT NOTIFICATION
import useAppStore from '../stores/useAppStore'
import { Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline' //npm i @heroicons/react
import { XMarkIcon } from '@heroicons/react/20/solid'

/*
aria-hidden: Es un atributo de ARIA (Accessible Rich Internet Applications) que se usa para 
mejorar la accesibilidad en las interfaces.
-true → Oculta el elemento de los lectores de pantalla.
-false → Hace que el elemento sea visible para los lectores de pantalla (por defecto).
En este caso, aria-hidden="true" le dice a los lectores de pantalla que ignoren este ícono, 
ya que es puramente decorativo y no aporta información adicional al usuario con discapacidad visual.

Cuando usar:
-Cuando el elemento es decorativo y no tiene un propósito funcional.
-En íconos de alerta, si ya existe un mensaje de texto que explica su significado.
*/

export default function Notification() {
  //State
  const { notification, closeNotification } = useAppStore();

  //---VIEW---//
  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        <Transition
          show={notification.show}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                    {notification.error ? (
                        <XCircleIcon className='w-6 h-6 text-red-400' aria-hidden="true" />
                    ) : (
                        <CheckCircleIcon className='w-6 h-6 text-green-400' aria-hidden="true" />
                    )}
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900">Notificación</p>
                  <p className="mt-1 text-sm text-gray-500">
                    {notification.text}
                  </p>
                </div>
                <div className="ml-4 flex flex-shrink-0">
                  <button
                    type="button"
                    className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={closeNotification}
                  >
                    {/*sr-only (Tailwind) oculta visualmente el texto pero 
                    sigue siendo leído por los lectores de pantalla*/}
                    <span className="sr-only">Cerrar</span>
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  )
}