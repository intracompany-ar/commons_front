// Hooks
import { ref, nextTick } from 'vue'
import { configDefaultDatatable } from './../defaults/datatable.js'
import axios from 'axios';
import DataTable from 'datatables.net-dt';

// No agregar export async sino no arrance el seteo iniciar de rows y demás
export function useFetchDatatable() {
    
    const CONFIG_DEFAULTS = { datatable: {
        buttons: [], 
        select: false
    }, callback: null, usePost: false, data: {}}
    const HEADER_DEFAULT = { Accept: 'application/json', 'Content-Type': 'application/json' }
    
    const rows = ref([])
    const dataTableTable = ref(null)

    /**
     * Set rows in a DataTable.
     *
     * @param {string} url - The URL to fetch data from.
     * @param {string} [tableId=''] - The ID of the table to populate.
     * @param {Object} [config={}] - Configuration object.
     * @param {Array} [config.buttons=[]] - Buttons configuration for DataTable.
     * @param {boolean} [config.select=false] - Enable row selection in DataTable.
     * @param {string} [config.dom='Bpftilp'] - DOM structure for DataTable.
     * @param {function|null} [config.callback=null] - Callback function to execute after setting rows.
     * @param {boolean} [config.usePost=false] - Use POST method instead of GET.
     * @param {Object} [config.data={}] - Data to send in the request.
     * @param {boolean} [config.api=false] - Include API token in the request headers.
     * @param {boolean} [config.noCache=false] - Indica al service worker si debe tomar la rta de la cache
     */
    async function setRows(url, tableId = null, configParam = {}){
        
        const config = { ...CONFIG_DEFAULTS, ...configParam }
        let headers = { ...HEADER_DEFAULT };
        
        if(config.noCache) headers['Cache-Control'] = 'no-cache';
        if(config.multipart) headers['Content-Type'] = 'multipart/form-data';
        
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

            resetDataTable();

            rows.value = response.data;

            await nextTick(); // Ensure the DOM is updated

            if (tableId) { initializeDataTable(tableId, config) } 
            
            if (typeof config.callback === 'function') { config.callback() }

        } catch (error) {
            console.error('Error fetching data:', error);
            resetDataTable();
        }
    }


    /**
     * Initialize the DataTable.
     *
     * @param {string} tableIdParam - The ID of the table to initialize.
     * @param {Object} config - Configuration object for the DataTable.
     */
    function initializeDataTable(tableIdParam, configDatatable) {

        dataTableTable.value = new DataTable('#' + tableIdParam, {
            stateSave: true,
            buttons: configDatatable.buttons ?? [],
            select: configDatatable.select ?? false,
            ...configDefaultDatatable
        });

        // dataTableTable.value = $('#' + tableIdParam).DataTable({
        //     stateSave: true,
        //     buttons: config.buttons ?? [],
        //     select: config.select ?? false,
        // })
    }

    function resetDataTable() {
        resetRows();
        if (dataTableTable && dataTableTable.value) { 
            dataTableTable.value.destroy();
            dataTableTable.value = null;
        };
    }

    function resetRows()
    {
        rows.value = [];
    }
    
    return { setRows, resetDataTable, dataTableTable, rows, resetRows }
}