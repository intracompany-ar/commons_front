
export const configDefaultDatatable =  {
    Serverside: false,
    processing: false,
    stateSave: true,
    dom: 'Bpftilp',// l: cant de regi a mostrar, p: paginacion, t: tabla (encabezado), i: informacion(ej PAg1/14), r: processing element, f: buscador. https://datatables.net/reference/option/dom
    info: true, //https://datatables.net/reference/option/info (el que dice por eje pag 1/24)
    searching: true,//https://datatables.net/reference/option/searching
    paging: true,//https://datatables.net/reference/option/paging
    lengthChange: true, //https://datatables.net/reference/option/lengthChange
    order: [0, 'desc'],
    language: {
        sSearch: ' ',
        searchPlaceholder: 'Buscar...',
        oPaginate: {
            sNext: '<i class="fa fa-arrow-right" aria-hidden="true"></i>',
            sPrevious: '<i class="fa fa-arrow-left" aria-hidden="true"></i>'
        },
        sEmptyTable: 'No hay registros para mostrar',
        sInfoEmpty: 'No se encontraron registros',
        sZeroRecords: 'No hay registros para mostrar',
        sLengthMenu: 'Mostrar _MENU_ filas por pág',
        sInfo: 'Pág: _PAGE_ / _PAGES_',
        sInfoFiltered: '(Filtrados de una total de _MAX_ registros)',
        //  sProcessing(){  return '<i class="fa fa-arrow-left" aria-hidden="true"></i>';},
    },
}