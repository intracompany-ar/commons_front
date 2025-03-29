// Hooks
import { ref, nextTick } from 'vue'
import { configDefaultDatatable } from './../defaults/datatable.js'
import axios from 'axios';
// import DataTable from 'datatables.net-dt';
import DataTable from 'datatables.net-buttons-bs5' // incluye DataTable + buttons
import jszip from 'jszip';
import 'datatables.net-buttons-bs5';
import 'datatables.net-buttons/js/buttons.html5.mjs';
// import pdfmake from 'pdfmake';
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

// Registrar las fuentes virtuales
pdfMake.vfs = pdfFonts.vfs

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
     * @param {Array} [config.datatable.buttons=[]] - Buttons configuration for DataTable.
     * @param {boolean} [config.datatable.select=false] - Enable row selection in DataTable.
     * @param {string} [config.dom='Bpftilp'] - DOM structure for DataTable.
     * @param {function|null} [config.callback=null] - Callback function to execute after setting rows.
     * @param {boolean} [config.usePost=false] - Use POST method instead of GET.
     * @param {Object} [config.data={}] - Data to send in the request.
     * @param {boolean} [config.api=false] - Include API token in the request headers.
     * @param {boolean} [config.noCache=false] - Indica al service worker si debe tomar la rta de la cache
     */
    async function setRows(url, tableId = null, configParam = {}){
        
        const config = {
            ...CONFIG_DEFAULTS,
            ...configParam,
            datatable: {
                ...CONFIG_DEFAULTS.datatable,
                ...(configParam.datatable ?? {})
            }
        }
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
            resetDataTable();

            const response = await axios(url, axiosConfig);

            rows.value = response.data;

            await nextTick(); // Ensure the DOM is updated
            await nextTick(); // a veces hace falta otro para asegurar render completo

            if (tableId) { initializeDataTable(tableId, config.datatable) } 
            
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
    function initializeDataTable(tableIdParam, configOptions) {
        const buttons = configOptions.buttons ?? [];

        // Si se incluye alguno de los botones html5, registramos jszip/pdfmake
        const hasExcel = buttons.some(b => (typeof b === 'string' && b === 'excelHtml5') || (typeof b === 'object' && b.extend === 'excelHtml5'));
        const hasPdf = buttons.some(b => (typeof b === 'string' && b === 'pdfHtml5') || (typeof b === 'object' && b.extend === 'pdfHtml5'));

        if (hasExcel) {
            console.debug('hasExcel', hasExcel);
            DataTable.Buttons.jszip(jszip);
            console.debug('hasExcel', DataTable.Buttons);
        }
        if (hasPdf && DataTable?.Buttons?.pdfMake) {
            DataTable.Buttons.pdfMake(pdfMake);
        }

        const tableOptions = {
            stateSave: true,
            buttons,
            select: configOptions.select ?? false,
            ...configDefaultDatatable
        }
        dataTableTable.value = new DataTable('#' + tableIdParam, tableOptions);
    }

    function resetDataTable() {
        console.debug('resetDataTable');
        if (dataTableTable.value) {
            console.debug('resetDataTable2');
            dataTableTable.value.destroy(true); // 💥 Destruye completamente la instancia y remueve el DOM generado
            dataTableTable.value = null;
        }
        rows.value = []; // 🔄 Limpiar las filas visuales
        console.debug('resetDataTable3', rows.value, dataTableTable.value);
    }

    function resetRows()
    {
        rows.value = [];
    }
    
    return { setRows, resetDataTable, dataTableTable, rows, resetRows }
}