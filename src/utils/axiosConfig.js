/**
 * Interceptores de request y responses de axios.
 * Van antes que el mount de app, sino no los puedo usar en onMounted de Layout.vue
 */
import axios from 'axios';
import { useAuth } from './../stores/auth.js';
import { showLoaders, disableSubmits, hideLoaders, enableSubmits } from './../utils/dom.js';
import { useStoreAdvices } from '../stores/store_advices.js';    
window.axios = axios;

export function axiosConfig(pinia) {
    const storeAuth = useAuth(pinia);
    const storeAdvices = useStoreAdvices(pinia);
    
    axios.interceptors.request.use(
        requestConfig => {
            if (requestConfig.noCache) {
                requestConfig.headers['Cache-Control'] = 'no-cache';
            }

            // Modificar la URL solo si NO es una URL completa (comienza con 'http' o 'https')
            if (!requestConfig.url.startsWith('http')) {
                requestConfig.url = `${import.meta.env.VITE_API_URL}/${requestConfig.url}`;
            }
            
            if (storeAuth.token) {
                requestConfig.headers['Authorization'] = `Bearer ${storeAuth.token}`;
            }
            requestConfig.headers['Accept'] = 'application/json';
            requestConfig.headers['Content-Type'] = requestConfig.headers['Content-Type'] ?? 'application/json';

            if (['put', 'post', 'delete'].includes(requestConfig.method)) {
                disableSubmits();
            }
            showLoaders();
            return requestConfig;
        },
        error => {
            console.log('Request fail', error.request);
            hideLoaders();
            enableSubmits();
            return Promise.reject(error);
        }
    );
                
    axios.interceptors.response.use(
        response => {
            hideLoaders();
            enableSubmits();

            if (response.status === 201) {
                storeAdvices.success(response.data.message || response.data);
                // SI ELIMINADO QUIERO MOSTRAR DESDE ACÁ EL SUCCESS DE ELEMENTO ELIMINADO ASÍ LIMPIO EL CÓDIGO EN EL RESTO DE LA PÁGINA. El tema que comparte 204 con update
            }
            return response;
        },

        async error => {
            hideLoaders();
            enableSubmits();

            if (error.response) {
                const { status, data } = error.response;
                switch (status) {
                    case 401:
                        storeAdvices.warning('No autorizado. Sesión caducó. Recargue la página.', `Error ${status}`);
                        await storeAuth.logout();
                        window.location.href = '/login'; // Redirigir al login. NO uso vue-router porque acá ya se cerró sesión, no puedo usar vue-rouer en este archivoe, solo dentro de un setup de Vue
                        break;
                    case 419:
                        storeAdvices.warning('CSRF no válido. Recargue la página.', `Error ${status}`);
                        break;
                    case 403:
                        storeAdvices.warning('No autorizado a realizar esta acción.', `Error ${status}`);
                        break;
                    case 404:
                        console.debug(data, status)
                        console.debug(data.message, status)
                        storeAdvices.warning(data?.message ?? 'Elemento no encontrado', `Error ${status}`);
                        break;
                    case 422:
                        const errors = typeof data === 'object' ? Object.values(data.errors).flat() : data;
                        storeAdvices.warning(errors, `Datos Inválidos. Error: ${status}`);
                        break;
                    default:
                        storeAdvices.danger('Algo salió mal, por favor notifique al administrador. Gracias');
                        break;
                }
            }
            return Promise.reject(error);
        }
    );
}

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'; // Setea header ajax por defecto

/**
 * Agregar en caso de Sanctum SPA auth
 * https://laravel.com/docs/11.x/sanctum#cors-and-cookies
 */
axios.defaults.withCredentials = true;
