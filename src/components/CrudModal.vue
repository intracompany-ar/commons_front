<script setup>
import { ref, onMounted, nextTick } from 'vue';
import ModalPpal from './ModalPpal.vue'
import TableCrud from './TableCrud.vue';

const tableCrud = ref(null);

const props = defineProps({
    titulo: { required: true, type: String },
    large: { required: false, type: Boolean, default: false },

    modalId: { required: true, type: String },//Tmb la uso para los id de la table

    // Para TableCrud
    urlIndex: { required: true, type: String },
    paramaterRouteName: { required: false, type: String, default: 'id' },
    paramaterRouteValue: { required: false, type: Number, default: 0 },

    urlStore: { required: false, type: String, default: null },
    urlUpdate: { required: false, type: String, default: null },
    urlDestroy: { required: false, type: String, default: null },
    urlShow: { required: false, type: String, default: null },

    // Requiere que una columna sea value id para que funcione el delete
    columnas: { required: true, type: Array },
    datatable: { required: false, type: Boolean, default: false },
    selectOptions: { required: false, type: [Array, Object], default() { return [] } },
    fatherField: { required: false, type: String, default: '' }
})

onMounted(() => {
    let modal = document.getElementById(props.modalId);
    modal.addEventListener('show.bs.modal', () => {
        tableCrud.value.resetRows();
        nextTick(() => { // Sino el getRows se ejecuta antes de la actualización del parámetro  paramaterRouteValue
            tableCrud.value.getRows();
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
    <ModalPpal v-bind:titulo="titulo" v-bind:id="modalId" v-bind:large="large">
        <template v-slot:bodymodal>
            <TableCrud ref="tableCrud" v-bind:id="props.modalId" v-bind:url-index="props.urlIndex"
                v-bind:paramater-route-name="props.paramaterRouteName"
                v-bind:paramater-route-value="props.paramaterRouteValue" v-bind:url-store="props.urlStore"
                v-bind:url-update="props.urlUpdate" v-bind:url-destroy="props.urlDestroy" v-bind:url-show="props.urlShow"
                v-bind:columnas="props.columnas" v-bind:datatable="props.datatable"
                v-bind:select-options="props.selectOptions" v-bind:father-field="props.fatherField" />
        </template>
    </ModalPpal>
</template>