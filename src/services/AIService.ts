//SERVICE - IA
import { streamText } from 'ai'
import { openrouter } from '../lib/ai'

/*
https://ai-sdk.dev/docs/
https://ai-sdk.dev/docs/foundations/prompts#system-prompts

'ai' es el Vercel AI SDK.
Es una librería creada por el equipo de Vercel para facilitar la integración de 
modelos de lenguaje (LLMs - Large Language Models) como OpenAI, OpenRouter y otros, 
dentro de aplicaciones web modernas (especialmente en Next.js 14+).

📌 ¿Para qué sirve?
    -Enviar mensajes a modelos LLM desde frontend (React) con hooks como useChat o 
    useCompletion.
    -Recibir respuestas en streaming desde el backend.
    -Manejar el estado de una conversación (historial de mensajes, estado de carga, errores) 
    sin tener que programarlo manualmente.
    -Simplificar la comunicación entre el cliente y la API que llama al modelo.

📌 Relación con @openrouter/ai-sdk-provider
    -El paquete ai te da los hooks y utilidades generales.
    -@openrouter/ai-sdk-provider te da la función de stream para conectar 
    con OpenRouter específicamente.

    Paquete	                        Propósito
    -ai	                            Hooks y utilidades del Vercel AI SDK. Maneja frontend y backend de IA.
    -@openrouter/ai-sdk-provider	Adaptador de stream para conectar OpenRouter AI con ai.
*/

/*
📌 streamText
streamText es una función del AI SDK que permite enviar un prompt de texto a un modelo LLM y 
obtener la respuesta en streaming.
    👉 Está pensado para text completions tradicionales (prompt → respuesta)
    👉 No para chats de mensajes múltiples (para eso es useChat y chat.completions.create).

    const { textStream } = await streamText({
        model,
        prompt,
        system,
        maxTokens
        temperature,
        // otros parámetros
    });

-model → puede ser una string (ej: "openai/gpt-4o") o una función que devuelve un modelo preconfigurada 
que, cuando se utiliza en una función como streamText, ya lleva implícita la API Key. En este caso 
se configuro previamente con createOpenRouter.
-prompt → string que quieres completar.
-temperature → 	(opcional) Creatividad (0-2)
-system → (opcional )conjunto inicial de instrucciones que se dan a los modelos y que ayudan a guiar 
y limitar sus comportamientos y respuestas.

📌 result.textStream 
Se está regresando solo la propiedad textStream, que es un AsyncIterableStream<string> que es un objeto 
que permite leer datos secuenciales a medida que llegan, sin esperar a que toda la respuesta esté completa.
Ideal para streaming en tiempo real, como cuando quieres que el frontend vaya mostrando letra por letra 
o bloque por bloque mientras el modelo genera contenido.
*/
export const generateRecipe = async (prompt : string) => {
    const result = streamText({
        model: openrouter('google/gemini-2.5-flash-lite-preview-06-17'),
        prompt,
        temperature: 1,
        system: 'Eres un bartender profesional que puede explicar la preparación de diferentes cócteles a cualquier persona'
    });

    return result.textStream 
}