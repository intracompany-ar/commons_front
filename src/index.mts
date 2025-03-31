export { isEmail, validarTributaryId, isJson, calculateTributaryIdFromDni } from './utils/validation'// Agregar el .js, sino en proyectos con ts, busca el validation.ts y da error not found
export { round, promPonderadoDiasCobro, tnavToTnaa, tnaaToTnav, tnavToTndv, tasaRecargada_to_tnav,tasaRecargada_to_tea, tnaToTea, teaToTna, tir } from './utils/formulas'
export { openModal, closeModals, hideLoaders, showLoaders,enableSubmits, disableSubmits } from './utils/dom'
export {loadScript} from './utils/scriptLoader'

export { useStoreAdvices } from './stores/store_advices'
export { configDefaultDatatable } from './defaults/datatable'
export { mountComponent } from './component_mounter'

export { useFetch } from './composables/useFetch'
export { useFetchDatatable } from './composables/useFetchDatatable'
export { useBlob } from './composables/useBlob'
export { destroy } from './composables/useDestroy'