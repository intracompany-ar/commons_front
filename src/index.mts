export * from './utils/validation'// Agregar el .js, sino en proyectos con ts, busca el validation.ts y da error not found
export * from './utils/formulas'
export * from './utils/dom'
export * from './utils/scriptLoader'

export * from './stores/store_advices'
export * from './defaults/datatable'
export * from './component_mounter'

export { useFetch } from './composables/useFetch'
export { useFetchDatatable } from './composables/useFetchDatatable'
export { useBlob } from './composables/useBlob'
export { destroy } from './composables/useDestroy'