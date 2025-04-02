// Hooks
import { ref, nextTick } from 'vue'
import type { Ref } from 'vue'
import { configDefaultDatatable } from './../defaults/datatable.js'
import axios from 'axios';
// import DataTable from 'datatables.net-dt';
import DataTable from 'datatables.net-buttons-bs5' // incluye DataTable + buttons
import type { Config, Api } from 'datatables.net/types/types.js'

import type { AxiosRequestConfig } from 'axios'
import * as jszip from 'jszip'
import 'datatables.net-buttons-bs5';
import 'datatables.net-buttons/js/buttons.html5.mjs';
import $ from 'jquery'
// import pdfmake from 'pdfmake';
// import * as pdfMake from 'pdfmake/build/pdfmake'
// import * as pdfFonts from 'pdfmake/build/vfs_fonts'

// // Registrar las fuentes virtuales
// pdfMake.vfs = pdfFonts.vfs

interface SetRowsConfig {
    noCache?: boolean
    usePost?: boolean
    data?: any
    callback?: () => void,
    datatable?: {
        buttons?: any[]
        select?: boolean
    }        
}

type ButtonOption = 
  | string 
  | { extend: string; [key: string]: any }

interface DataTableConfigOptions {
  buttons?: ButtonOption[]
  select?: boolean
  [key: string]: any // para permitir extensiones extra
}

type LayoutElement =
  | 'info'
  | 'pageLength'
  | 'paging'
  | 'processing'
  | 'search'
  | 'table'
  | 'toolbar'
  | 'buttons'
  | 'filter'
  | 'custom'

type LayoutFeatures = {
    topStart?: LayoutElement | LayoutElement[] | null
    topEnd?: LayoutElement | LayoutElement[] | null
    bottomStart?: LayoutElement | LayoutElement[] | null
    bottomEnd?: LayoutElement | LayoutElement[] | null
}

// No agregar export async sino no arrance el seteo iniciar de rows y demás
export function useFetchDatatable() {
    
    const CONFIG_DEFAULTS = { datatable: {
        buttons: [], 
        select: false
    }, callback: null, usePost: false, data: {}}
    
    const rows = ref([])
    const dataTableTable = ref<DataTables.Api | null>(null)


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
    async function setRows(url: string, tableId = null, configParam: SetRowsConfig = {}){
        
        const config = {
            ...CONFIG_DEFAULTS,
            ...configParam,
            datatable: {
                ...CONFIG_DEFAULTS.datatable,
                ...(configParam.datatable ?? {})
            }
        }
        let headers: Record<string, string> = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        
        if(config.noCache) headers['Cache-Control'] = 'no-cache';
        
        const axiosConfig: AxiosRequestConfig  = {
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
    function initializeDataTable(tableIdParam: string, configOptions: DataTableConfigOptions) {
        const buttons = configOptions.buttons ?? [];

        // Si se incluye alguno de los botones html5, registramos jszip/pdfmake
        const hasExcel = buttons.some((b: ButtonOption) => (typeof b === 'string' && b === 'excelHtml5') || (typeof b === 'object' && b.extend === 'excelHtml5'));
        const hasPdf = buttons.some((b: ButtonOption) => (typeof b === 'string' && b === 'pdfHtml5') || (typeof b === 'object' && b.extend === 'pdfHtml5'));

        if (hasExcel) {
            console.debug('hasExcel', hasExcel);
            (DataTable as any).Buttons.jszip(jszip)

            console.debug('hasExcel', (DataTable as any).Buttons);
        }
        // if (hasPdf && DataTable?.Buttons?.pdfMake) {
        //     // DataTable.Buttons.pdfMake(pdfMake);
        // }

        const tableOptions: Config = {
            buttons,
            // select: configOptions.select ?? false, // TODO: Refactorizar, lo saqué por ts, no lo pude configurar y como no lo estoy usando ahora, lo dejé
            ...configDefaultDatatable
        }
        // dataTableTable.value = new DataTable('#' + tableIdParam, tableOptions);
        dataTableTable.value = $('#' + tableIdParam).DataTable(tableOptions as any)
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