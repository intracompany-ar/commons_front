// Hooks
import { ref } from 'vue'
import axios from 'axios';

// No agregar export async sino no arrance el seteo iniciar de rows y demás
export function useFetch() {
    
    const CONFIG_DEFAULTS = { callback: null, usePost: false, data: {}}
    const HEADER_DEFAULT = { Accept: 'application/json', 'Content-Type': 'application/json' }
    
    const rows = ref([])

    /**
     * Set rows in a DataTable.
     *
     * @param {string} url - The URL to fetch data from.
     * @param {Object} [config={}] - Configuration object.
     * @param {function|null} [config.callback=null] - Callback function to execute after setting rows.
     * @param {boolean} [config.usePost=false] - Use POST method instead of GET.
     * @param {Object} [config.data={}] - Data to send in the request.
     * @param {boolean} [config.api=false] - Include API token in the request headers.
     * @param {boolean} [config.noCache=false] - Indica al service worker si debe tomar la rta de la cache
     */
    async function setRows(url, configParam = {}){
        
        const config = { ...CONFIG_DEFAULTS, ...configParam }
        let headers = HEADER_DEFAULT;
        if(config.noCache) headers['Cache-Control'] = 'no-cache';
        
        const axiosConfig  = {
            headers,
            method: config.usePost ? 'post' : 'get',
        }

        if (config.usePost) {
            axiosConfig.data = config.data;
        } else {
            axiosConfig.params = config.data;
        }

        try {
            const response = await axios(url, axiosConfig);
            rows.value = response.data;
            if (typeof config.callback === 'function') { config.callback() }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function resetRows(){ rows.value = []; }
    
    return { setRows, rows, resetRows }
}