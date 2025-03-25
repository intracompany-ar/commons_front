// Esto se ejecuta antes que nada, si lo pongo dentro de main.js da error el jqueryUi

import jQuery from 'jquery';// Lo uso para serialize form y para datatable y jquery-ui Autocomplete

// Asignar jQuery global (como hacías antes)
if (typeof window !== 'undefined') {
    window.$ = jQuery
    window.jQuery = jQuery
}