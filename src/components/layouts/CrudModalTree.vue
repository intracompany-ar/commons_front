<script setup>
import { provide } from "vue";
import ModalPpal from "./../ModalPpal.vue";
import { openModal } from './../../../src/utils/dom.js'
import { useFetchDatatable } from './../../../src/composables/useFetchDatatable'
import TreeItem from "./TreeItem.vue";
const { rows, setRows, resetDataTable } = useFetchDatatable()

const emit = defineEmits(["itemSelected"]);

const props = defineProps({
    titulo: { required: true, type: String },
    modalId: { required: true, type: String },
    
    large: { required: false, type: Boolean, default: false },

    urlGetRoot: { required: false, type: String, default: null },
    urlGetChildren: { required: false, type: String, default: null },
    urlStore: { required: false, type: String, default: null },
    urlEdit: { required: false, type: String, default: null },
    urlDestroy: { required: false, type: String, default: null },

    fatherField: { required: false, type: String, default: "" },
});

provide("urlEdit", props.urlEdit);
provide("urlDestroy", props.urlDestroy);
provide("urlStore", props.urlStore);
provide("urlGetChildren", props.urlGetChildren);

defineExpose({ open });
function open() {
    openModal(props.modalId);
    resetDataTable();
    getRows();
}

function getRows() { setRows(props.urlGetRoot) }

function addRow() {
    let formData = {};
    formData["name"] = document.querySelector("#" + props.modalId + "_name").value;

    axios.post(props.urlStore, formData)
        .then(() => {
            getRows();
            resetInputs();
        });
}

function resetInputs() {
    if (document.querySelector("#" + props.modalId + "_name")) {
        document.querySelector("#" + props.modalId + "_name").value = "";
    }
}

function pasarAModoAdd() { }
</script>

<template>
    <ModalPpal :titulo="titulo" :id="modalId" :large="large" :padding="0">
        <template v-slot:bodymodal>
            <div class="container-fluid m-0 p-0">
                <div class="row" v-if="props.urlStore">
                    <div class="offset-md-3 col-md-6 col-12">
                        <div class="input-group input-group-sm">
                            <input class="form-control form-control-sm" type="text" :id="modalId + '_name'" />

                            <a href="#" v-on:click.prevent="addRow" class="btn btn-secondary" v-show="props.urlStore">
                                <i class="fas fa-save"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="row mt-4">
                    <div class="col-12">
                        <ul onselectstart="return false" style="list-style-type: none">
                            <TreeItem v-for="row in rows" :key="row.id" :item="row"
                                :father-field="fatherField" class="tree-item" ref="treeItem" v-on:updated="getRows"
                                v-on:item-selected="emit('itemSelected', {
                                    id: $event.id,
                                    code: $event.code,
                                    label: $event.name,
                                    name: $event.name,
                                    value: $event.id,
                                })" v-on:to-add="pasarAModoAdd($event.id)" />
                        </ul>
                    </div>
                </div>
            </div>
        </template>
    </ModalPpal>
</template>
