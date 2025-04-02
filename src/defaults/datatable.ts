import type { Config } from 'datatables.net/types/types.js'

export const configDefaultDatatable: Config =  {
    serverSide: false,
    processing: false,
    stateSave: true,
    layout:{
        topStart: ['search'],
        topEnd: [ 'paging'],
        bottomStart: ['info', 'pageLength', 'buttons'],
        bottomEnd: ['paging']
    },
    info: true, //https://datatables.net/reference/option/info (el que dice por eje pag 1/24)
    searching: true,//https://datatables.net/reference/option/searching
    paging: true,//https://datatables.net/reference/option/paging
    lengthChange: true, //https://datatables.net/reference/option/lengthChange
    order: [[0, 'desc']],
    language: {
        search: ' ',
        searchPlaceholder: 'Buscar...',
        paginate: {
            next: '<i class="fa fa-arrow-right" aria-hidden="true"></i>',
            previous: '<i class="fa fa-arrow-left" aria-hidden="true"></i>'
        },
        emptyTable: 'No hay registros para mostrar',
        infoEmpty: 'No se encontraron registros',
        zeroRecords: 'No hay registros para mostrar',
        lengthMenu: 'Mostrar _MENU_ filas por pág',
        info: 'Pág: _PAGE_ / _PAGES_',
        infoFiltered: '(Filtrados de una total de _MAX_ registros)',
        //  sProcessing(){  return '<i class="fa fa-arrow-left" aria-hidden="true"></i>';},
    },
}