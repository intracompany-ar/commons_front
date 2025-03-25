export * from './src/utils/validation.js';// Agregar el .js, sino en proyectos con ts, busca el validation.ts y da error not found
export * from './src/utils/formulas.js';
export * from './src/utils/dom.js';
export * from './src/utils/scriptLoader.js';
export * from './src/utils/axiosConfig.js';

export * from './src/stores/store_advices.js';
export * from './src/stores/auth.js';
export * from './src/defaults/datatable.js';
export * from './src/components/component_mounter.js';

export { default as ButtonPlus } from './src/components/forms/buttons/ButtonPlus.vue';
export { default as ButtonSearch } from './src/components/forms/buttons/ButtonSearch.vue';
export { default as ButtonSubmit } from './src/components/forms/buttons/ButtonSubmit.vue';
export { default as RowButtonSubmit } from './src/components/forms/buttons/RowButtonSubmit.vue';
export { default as ButtonChat } from './src/components/forms/buttons/ButtonChat.vue';
export { default as ButtonComment } from './src/components/forms/buttons/ButtonComment.vue';
export { default as ButtonDirectAccess } from './src/components/forms/buttons/ButtonDirectAccess.vue';
export { default as ButtonRefresh } from './src/components/forms/buttons/ButtonRefresh.vue';
export { default as LabelClienteNombreTributaryIdMail } from './src/components/forms/LabelClienteNombreTributaryIdMail.vue';
export { default as FormEditDelete } from './src/components/forms/FormEditDelete.vue';
export { default as FilterStandard } from './src/components/forms/FilterStandard.vue';

export { default as SelectBase } from './src/components/forms/selects/SelectBase.vue';
export { default as SelectizeBase } from './src/components/forms/selects/SelectizeBase.vue';
export { default as SelectizeBaseMulti } from './src/components/forms/selects/SelectizeBaseMulti.vue';
export { default as SelectizeTags } from './src/components/forms/selects/SelectizeTags.vue';
export { default as SelectBranchOffice } from './src/components/forms/selects/SelectBranchOffice.vue';


export { default as TextArea } from './src/components/forms/inputs/TextArea.vue';
export { default as InputCrudImage } from './src/components/forms/inputs/InputCrudImage.vue';
export { default as InputStandard } from './src/components/forms/inputs/InputStandard.vue';
export { default as InputFechaDesde } from './src/components/forms/inputs/InputFechaDesde.vue';
export { default as InputFechaHasta } from './src/components/forms/inputs/InputFechaHasta.vue';
export { default as InputFecha } from './src/components/forms/inputs/InputFecha.vue';
export { default as InputTributaryId } from './src/components/forms/inputs/InputTributaryId.vue';
export { default as InputDescRec } from './src/components/forms/inputs/InputDescRec.vue';
export { default as InputNumber } from './src/components/forms/inputs/InputNumber.vue';
export { default as InputText } from './src/components/forms/inputs/InputText.vue';
export { default as Method } from './src/components/forms/inputs/Method.vue';
export { default as Csrf } from './src/components/forms/inputs/Csrf.vue';

export { default as RadioLine } from './src/components/forms/radios/RadioLine.vue';

export { default as BadgeQuantityNotifications } from './src/components/notifications/BadgeQuantityNotifications.vue';
export { default as AdvicesFrontend } from './src/components/notifications/AdvicesFrontend.vue';
export { default as AdviceNoRecordsToShow } from './src/components/AdviceNoRecordsToShow.vue';
export { default as ListBadgesFamilies } from './src/components/ListBadgesFamilies.vue';
export { default as TableStandard } from './src/components/TableStandard.vue';
export { default as CalculadoraCuit } from './src/components/CalculadoraCuit.vue';
export { default as CalculadoraMarkUps } from './src/components/CalculadoraMarkUps.vue';
export { default as CalculadoraMVE } from './src/components/CalculadoraMVE.vue';
export { default as ModalPpal } from './src/components/ModalPpal.vue';
export { default as CrudModalTree } from './src/components/layouts/CrudModalTree.vue';
export { default as IndexStandard } from './src/components/layouts/IndexStandard.vue';

export { default as ShowCalificacionTributaryId } from './src/components/ShowCalificacionTributaryId.vue';
export { default as Loader } from './src/components/Loader.vue';
export { default as LoaderError } from './src/components/LoaderError.vue';
export { default as TableCrud } from './src/components/TableCrud.vue';
export { default as CrudModal } from './src/components/CrudModal.vue';

export { default as LayoutSimple } from './src/layouts/Simple.vue';
export { default as LayoutGuest } from './src/layouts/Guest.vue';
export { default as ShowBase } from './src/layouts/ShowBase.vue';
export { default as CreateOrEditBase } from './src/layouts/CreateOrEditBase.vue';

export { default as ConvertTasaImplicitaDescProntoPago } from './src/components/finances/ConvertTasaImplicitaDescProntoPago.vue';
export { default as CalculadoraChequesDiferidos } from './src/components/finances/CalculadoraChequesDiferidos.vue';
export { default as ConvertTasaAnticipadaVencida } from './src/components/finances/ConvertTasaAnticipadaVencida.vue';
export { default as ConvertTnaTea } from './src/components/finances/ConvertTnaTea.vue';
export { default as ExchangeRates } from './src/components/finances/ExchangeRates.vue';

export { default as notificationSound } from './src/audio/notification.mp3';


export { useFetch } from './src/composables/useFetch.ts';
export { useFetchDatatable } from './src/composables/useFetchDatatable.ts';
export { useBlob } from './src/composables/useBlob.js';
export { destroy } from './src/composables/useDestroy.ts';