//LIB AI
import { createOpenRouter } from '@openrouter/ai-sdk-provider' //npm install @openrouter/ai-sdk-provider

/*
https://openrouter.ai/docs/api-reference/streaming
https://openrouter.ai/docs/community/vercel-ai-sdk

@openrouter/ai-sdk-provide
Es un adaptador oficial de OpenRouter que permite conectar el Vercel AI SDK (ai) 
con la API de OpenRouter.
El SDK de Vercel funciona por defecto con OpenAI (openai.com), y este provider 
adapta el formato de peticiones, autenticación y respuesta en streaming para que 
puedas usar OpenRouter AI como backend LLM, aprovechando los hooks useChat y 
useCompletion del AI SDK

📌 ¿Para qué sirve?
Para que desde una API route (o Server Action, o Edge Function) puedas:
    -Enviar mensajes a OpenRouter.
    -Recibir la respuesta en streaming compatible con el AI SDK de Vercel.
    -Evitar implementar desde cero el manejo del fetch, headers, token y stream reader
*/

/*
📌 createOpenRouter
Es una función que crea una instancia de cliente configurado para OpenRouter AI, que puedes 
usar dentro de tu cliente-fetch o backend para enviar peticiones a OpenRouter, sin tener 
que escribir el fetch manual.

📌 Parámetros que recibe
    createOpenRouter({
        apiKey: string,       // 🔐 Obligatorio. Tu API Key de OpenRouter
        baseURL?: string,     // 🌐 Opcional. Por defecto es 'https://openrouter.ai/api/v1'
    });

📌 Parámetros de la instancia
    openrouter("modelo")	// Función de modelo preconfigurada con tu API Key y endpoint
*/
export const openrouter = createOpenRouter({
    apiKey: import.meta.env.VITE_OPENROUTER_KEY
});