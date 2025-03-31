export * from './utils/validation'// Agregar el .js, sino en proyectos con ts, busca el validation.ts y da error not found
export * from './utils/formulas'
export * from './utils/dom'
export * from './utils/scriptLoader'

export * from './stores/store_advices'
export * from './defaults/datatable'
export * from './components/component_mounter'

export { default as ButtonPlus } from './components/forms/buttons/ButtonPlus.vue'
export { default as ButtonSearch } from './components/forms/buttons/ButtonSearch.vue'
export { default as ButtonSubmit } from './components/forms/buttons/ButtonSubmit.vue'
export { default as RowButtonSubmit } from './components/forms/buttons/RowButtonSubmit.vue'
export { default as ButtonChat } from './components/forms/buttons/ButtonChat.vue'
export { default as ButtonComment } from './components/forms/buttons/ButtonComment.vue'
export { default as ButtonDirectAccess } from './components/forms/buttons/ButtonDirectAccess.vue'
export { default as ButtonRefresh } from './components/forms/buttons/ButtonRefresh.vue'
export { default as LabelClienteNombreTributaryIdMail } from './components/forms/LabelClienteNombreTributaryIdMail.vue'
export { default as FormEditDelete } from './components/forms/FormEditDelete.vue'
export { default as FilterStandard } from './components/forms/FilterStandard.vue'

export { default as SelectBase } from './components/forms/selects/SelectBase.vue'
export { default as SelectizeBase } from './components/forms/selects/SelectizeBase.vue'
export { default as SelectizeBaseMulti } from './components/forms/selects/SelectizeBaseMulti.vue'
export { default as SelectizeTags } from './components/forms/selects/SelectizeTags.vue'
export { default as SelectBranchOffice } from './components/forms/selects/SelectBranchOffice.vue'


export { default as TextArea } from './components/forms/inputs/TextArea.vue'
export { default as InputCrudImage } from './components/forms/inputs/InputCrudImage.vue'
export { default as InputStandard } from './components/forms/inputs/InputStandard.vue'
export { default as InputFechaDesde } from './components/forms/inputs/InputFechaDesde.vue'
export { default as InputFechaHasta } from './components/forms/inputs/InputFechaHasta.vue'
export { default as InputFecha } from './components/forms/inputs/InputFecha.vue'
export { default as InputTributaryId } from './components/forms/inputs/InputTributaryId.vue'
export { default as InputDescRec } from './components/forms/inputs/InputDescRec.vue'
export { default as InputNumber } from './components/forms/inputs/InputNumber.vue'
export { default as InputText } from './components/forms/inputs/InputText.vue'
export { default as Method } from './components/forms/inputs/Method.vue'
export { default as Csrf } from './components/forms/inputs/Csrf.vue'

export { default as RadioLine } from './components/forms/radios/RadioLine.vue'

export { default as BadgeQuantityNotifications } from './components/notifications/BadgeQuantityNotifications.vue'
export { default as AdvicesFrontend } from './components/notifications/AdvicesFrontend.vue'
export { default as AdviceNoRecordsToShow } from './components/AdviceNoRecordsToShow.vue'
export { default as ListBadgesFamilies } from './components/ListBadgesFamilies.vue'
export { default as TableStandard } from './components/TableStandard.vue'
export { default as CalculadoraCuit } from './components/CalculadoraCuit.vue'
export { default as CalculadoraMarkUps } from './components/CalculadoraMarkUps.vue'
export { default as ModalPpal } from './components/ModalPpal.vue'
export { default as CrudModalTree } from './components/layouts/CrudModalTree.vue'
export { default as IndexStandard } from './components/layouts/IndexStandard.vue'

export { default as ShowCalificacionTributaryId } from './components/ShowCalificacionTributaryId.vue'
export { default as Loader } from './components/Loader.vue'
export { default as LoaderError } from './components/LoaderError.vue'
export { default as TableCrud } from './components/TableCrud.vue'
export { default as CrudModal } from './components/CrudModal.vue'

export { default as LayoutSimple } from './layouts/Simple.vue'
export { default as LayoutGuest } from './layouts/Guest.vue'
export { default as ShowBase } from './layouts/ShowBase.vue'
export { default as CreateOrEditBase } from './layouts/CreateOrEditBase.vue'

export { default as ConvertTasaImplicitaDescProntoPago } from './components/finances/ConvertTasaImplicitaDescProntoPago.vue'
export { default as CalculadoraChequesDiferidos } from './components/finances/CalculadoraChequesDiferidos.vue'
export { default as ConvertTasaAnticipadaVencida } from './components/finances/ConvertTasaAnticipadaVencida.vue'
export { default as ConvertTnaTea } from './components/finances/ConvertTnaTea.vue'
export { default as ExchangeRates } from './components/finances/ExchangeRates.vue'

export { default as notificationSound } from './audio/notification.mp3'

export { useFetch } from './composables/useFetch'
export { useFetchDatatable } from './composables/useFetchDatatable'
export { useBlob } from './composables/useBlob'
export { destroy } from './composables/useDestroy'