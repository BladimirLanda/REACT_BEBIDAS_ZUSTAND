//VIEW GENERATE AI
import { FormEvent } from "react"
import useAppStore from "../stores/useAppStore";

/*
https://openrouter.ai/

OpenRouter AI es una plataforma de ruteo de modelos de inteligencia artificial que 
permite a los desarrolladores conectarse y usar distintos modelos de IA (como GPT-4o, 
Claude, Mistral, Gemini, LLaMA, entre otros) a través de una API unificada.

En vez de consumir directamente la API de OpenAI, Anthropic, Google o Meta de 
forma separada, OpenRouter actúa como intermediario o "router" para dirigir las 
solicitudes al modelo que tú elijas, facilitando:
    -Cambiar de modelo sin tener que modificar el backend.
    -Acceder a modelos cerrados o de pago sin registrarte en cada proveedor.
    -Comparar el rendimiento de diferentes modelos en una misma infraestructura.

📌 ¿Para qué se usa?
    -Para integrar modelos de IA en aplicaciones web o backend (chatbots, asistentes 
    virtuales, motores de recomendación, herramientas de generación de texto, etc.).
    -Para experimentar con diferentes modelos de lenguaje sin tener que crear cuentas en 
    cada proveedor ni gestionar suscripciones por separado.
    -Para centralizar autenticación y facturación en una sola cuenta.
*/

function GenerateAI() {
    //State
    const { showNotification, generateRecipe, isGenerating, recipe } = useAppStore();

    //Handle
    const handleSubmit = async(e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        /*
        👉 FormData es una API de JavaScript para leer los valores de los inputs de un formulario HTML.
        👉 e.currentTarget hace referencia al formulario <form> que disparó el evento onSubmit.
        👉 form.get('prompt') obtiene el valor del input cuyo atributo name="prompt".
        👉 as string es una aserción de tipo de TypeScript que indica que se espera recibir una cadena.
        */
        const form = new FormData(e.currentTarget);
        const prompt = form.get('prompt') as string;

        if(prompt.trim() === '') {
            showNotification({
                text: 'La busqueda no puede ir vacia',
                error: true
            });

            return;
        }

        await generateRecipe(prompt);
    }

    //---VIEW---//
    return (
        <>
        <h1 className="text-6xl font-extrabold">Generar Receta IA</h1>

        <div className="max-w-4xl mx-auto px-2">
            <form  className='flex flex-col space-y-3 py-10'
            onSubmit={handleSubmit}>
                <div className="relative">
                    <input 
                    name="prompt" 
                    id="prompt" 
                    className="border bg-white p-4 rounded-lg w-full border-slate-800" 
                    placeholder="Genera una receta con ingredientes. Ej. Bebida con Tequila y Fresa"
                    />

                    <button 
                    type="submit" 
                    aria-label="Enviar"
                    className={`cursor-pointer absolute top-1/2 right-5 transform -translate-x-1/2 -translate-y-1/2
                        ${isGenerating ? "cursor-not-allowed opacity-50" : ""}`}
                    disabled={isGenerating}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                            stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round"
                            d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>
            </form>

            {isGenerating && 
                <p className="text-center text-lg font-semibold text-indigo-600 animate-blink mb-4">
                    Generando receta...
                </p>}

            <div className="py-6 px-4 whitespace-pre-wrap bg-white/70 border border-gray-200 
            rounded-2xl shadow-md text-gray-800 text-base leading-relaxed">
                {recipe}
            </div>
        </div>
        </> 
    )
}

export default GenerateAI;