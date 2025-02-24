/**
 * URL de la API.
 * @type {string}
 * @description La URL base para las solicitudes a la API.
 */
export const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Título de la aplicación.
 * @type {string}
 * @description El título que se muestra en la interfaz de usuario de la aplicación.
 */
export const appTitle = import.meta.env.VITE_APP_TITLE || 'Bar';