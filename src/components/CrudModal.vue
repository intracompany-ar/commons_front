<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import ModalPpal from './ModalPpal.vue'
import TableCrud from './TableCrud.vue'

const tableCrud = ref(null);

const props = defineProps({
    titulo: { required: true, type: String },
    subtitle: { required: false, type: String },

    modalId: { required: true, type: String },//Tmb la uso para los id de la table

    // Para TableCrud
    model: { required: true, type: String },
    parameterRouteName: { required: false, type: String, default: 'id' },
    parameterRouteValue: { required: false, type: Number, default: 0 },

    params: { required: false, type: Object, default() { return {} } },

    // Requiere que una columna sea value id para que funcione el delete
    columnas: { required: true, type: Array },
    selectOptions: { required: false, type: [Array, Object], default() { return [] } },
    fatherField: { required: false, type: String, default: '' },

    config: { required: false, type: Object, default() { return {
        show: false,
        large: false,
        datatable: false
    } } }

})

const parametersTableCrud = computed(() => ({
    model: props.model,
    parameterRouteName: props.parameterRouteName,
    parameterRouteValue: props.parameterRouteValue,
    columnas: props.columnas,
    datatable: props.config.datatable,
    selectOptions: props.selectOptions,
    fatherField: props.fatherField,
    id: props.modalId,
    config: props.config
}))

const parametersModal = computed(() => ({
    titulo: props.titulo,
    subtitle: props.subtitle,
    id: props.modalId,
    large: props.config.large
}))

onMounted(() => {
    let modal = document.getElementById(props.modalId);
    modal.addEventListener('show.bs.modal', () => {
        console.log('show modal', props)
        console.log('parametersTableCrud', parametersTableCrud)
        
        tableCrud.value.resetRows();
        nextTick(() => { // Sino el getRows se ejecuta antes de la actualización del parámetro  parameterRouteValue
            tableCrud.value.getRows(props.params);
            tableCrud.value.resetInputs();// Para que setee valores fijos
        });
        console.debug('show modal standard');
    });

    modal.addEventListener('hidden.bs.modal', () => {
        tableCrud.value.destroyTable();
    });
})
</script>

<template>
    <ModalPpal v-bind="parametersModal">
        <template v-slot:bodymodal>
            <TableCrud ref="tableCrud" v-bind="parametersTableCrud"/>
        </template>
    </ModalPpal>
</template>