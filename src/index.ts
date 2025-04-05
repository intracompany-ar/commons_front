export { isEmail, validarTributaryId, isJson, calculateTributaryIdFromDni } from './utils/validation.js'// Agregar el .js, sino en proyectos con ts, busca el validation.ts y da error not found
export { round, promPonderadoDiasCobro, tnavToTnaa, tnaaToTnav, tnavToTndv, tasaRecargada_to_tnav,tasaRecargada_to_tea, tnaToTea, teaToTna, tir } from './utils/formulas.js'
export { openModal, closeModals, hideLoaders, showLoaders,enableSubmits, disableSubmits } from './utils/dom.js'
export {loadScript} from './utils/scriptLoader.js'

export { copiar } from './utils/text.js'
export { advice, showAdvice } from './utils/advicesBus.js'
export { configDefaultDatatable } from './defaults/datatable.js'

export { useFetch } from './composables/useFetch.js'
export { useFetchDatatable } from './composables/useFetchDatatable.js'
export type { SetRowsConfig } from './composables/useFetchDatatable.js'

export { useBlob } from './composables/useBlob.js'
export { destroy } from './composables/useDestroy.js'