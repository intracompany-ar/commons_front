<script setup>
import { ref } from 'vue'
import { useStoreAdvices } from './../stores/store_advices'
import { configDefaultDatatable } from './../defaults/datatable';
import $ from 'jquery';
import 'datatables.net';
$.extend(true, $.fn.dataTable.defaults, configDefaultDatatable);

const storeAdvices = useStoreAdvices()
const emit = defineEmits(['openModalShow']);

const modoEdit = ref(false)
const father_id = ref(0)
const rows = ref([])
const tabla = ref(null)
const paramsGet = ref({})

const props = defineProps({
    id: { required: true, type: String }, // Tmb la uso para los id de la table

    model: { required: true, type: String },
    parameterRouteName: { required: false, type: String, default: 'id' },
    parameterRouteValue: { required: false, type: Number, default: 0 },

    // Requiere que una columna sea value id para que funcione el delete
    columnas: { required: true, type: Array },
    datatable: { required: false, type: Boolean, default: false },
    selectOptions: { required: false, type: [Array, Object], default() { return [] } },
    fatherField: { required: false, type: String, default: '' },

    modalShow: { required: false, type: Boolean, default: false },

    config: { required: false, type: Object, default() { return {
        crud: false,
        show: false,
    } } }
})

defineExpose({ getRows, resetInputs, resetRows, destroyTable })
function getRows(paramsGetParam = {}) {
    paramsGet.value = paramsGetParam;
    let url = props.model;
    if (props.parameterRouteName) {
        url = url.replace(':' + props.parameterRouteName, props.parameterRouteValue)
            .replace('%3A' + props.parameterRouteName, props.parameterRouteValue);
    };

    axios(url, { params: paramsGet.value })
        .then(response => {
            try {
                rows.value = JSON.parse(response.data)
            } catch (error) {
                rows.value = response.data
            }
        })
        .then(() => { if (props.datatable && tabla) { tabla.value = $('#table_' + props.id).DataTable({ buttons: [] }) } })
}

function resetRows() { rows.value = [] }

function destroyTable() {
    if (props.datatable && tabla && tabla.value) {
        tabla.value.destroy()
    }
}

function resetInputs() {
    props.columnas.forEach(columna => {

        if (document.querySelector('#' + props.id + '_' + columna.value)) {
            document.querySelector('#' + props.id + '_' + columna.value).value = "";
        };
        
        if (columna.valorFijo) {
            console.debug('Set valor fijo', columna.valorFijo);
            document.querySelector('#' + props.id + '_' + columna.value).value = columna.valorFijo;
        }
    });
}

function pasarAModoAdd(father_idParam = 0) {
    father_id.value = father_idParam;
    resetInputs();
    modoEdit.value = false;
}

function pasarAEdicion(row) {
    modoEdit.value = true;
    props.columnas.forEach(columna => {
        let el = document.querySelector('#' + props.id + '_' + columna.value);
        if (el) { el.value = row[columna.value]; }
    });
}

function store() {
    let formData = {};
    props.columnas.forEach(columna => {
        let el = document.querySelector('#' + props.id + '_' + columna.value);
        if (el) { formData[columna.value] = el.value; }

        if (props.fatherField != '') {
            formData[props.fatherField] = father_id.value;
        }
    });
    axios.post(props.model, formData)
        .then(() => {
            if (props.datatable && tabla && tabla.value) { tabla.value.destroy() }
            getRows(paramsGet.value);
            resetInputs()
        });
}

function editRow() {
    let formData = {};

    props.columnas.forEach(columna => {
        let el = document.querySelector('#' + props.id + '_' + columna.value);
        if (el) { formData[columna.value] = el.value; }
    });

    let urlEdit = props.model;

    axios.put(urlEdit+'/'+formData[props.parameterRouteName], formData)
        .then(response => {
            storeAdvices.success('Actualizado');
            if (props.datatable && tabla && tabla.value) { tabla.value.destroy() }
            getRows(paramsGet.value);
            pasarAModoAdd();
        })
}

function deleteRow(id) {
    if (confirm('Seguro desea eliminar este elemento?')) {
        let urlDelete = props.model;
        axios.delete(urlDelete+'/'+id)
            .then(response => {
                storeAdvices.success('Elemento eliminado');
                if (props.datatable && tabla && tabla.value) { tabla.value.destroy() }
                getRows(paramsGet.value);
                pasarAModoAdd();
            })
    }
}

function evaluarVariableString(row, valueAux) {
    let arrayValueAux = valueAux.split('.');
    return row[arrayValueAux[0]] ? row[arrayValueAux[0]][arrayValueAux[1]] : '';
}
</script>

<template>
    <table :id="'table_' + props.id" class="table table-sm table-striped table-hover table-bordered compact"
        width="100%" cellspacing="0" border="1">
        <thead>
            <tr>
                <td v-for="(columna, index) in columnas" :key="index">
                    <div v-if="father_id != 0">
                        Hijo de {{ father_id }}

                        <a href="#" v-on:click.prevent="father_id = 0" class="btn btn-primary btn-sm">
                            <i class="fas fa-times"></i></a>
                    </div>

                    <input v-if="['hidden', 'text', 'number', 'date'].includes(columna.type)"
                        class="form-control form-control-sm" :type="columna.type"
                        :id="props.id + '_' + columna.value">

                    <select v-if="columna.type == 'select'" class="form-control form-control-sm"
                        :id="props.id + '_' + columna.value">
                        <option v-for="option in columna.selectOptions" :value="option.id">{{ option.name }}</option>
                    </select>
                </td>

                <td>
                    <a href="#" v-on:click.prevent="store" class="btn btn-success" v-show="!modoEdit">
                        <i class="fas fa-save"></i></a>

                    <a href="#" v-on:click.prevent="editRow" class="btn btn-success btn-sm"
                        v-show="modoEdit">
                        <i class="far fa-edit"></i></a>

                    <a href="#" v-on:click.prevent="pasarAModoAdd()" class="btn btn-danger btn-sm"
                        v-show="modoEdit">
                        <i class="fas fa-times"></i></a>
                </td>

            </tr>

            <tr class="thead-inverse">
                <th scope="col" v-for="(columna, index) in columnas" :key="index">{{ columna.titulo }}</th>
                <th></th>
            </tr>

        </thead>

        <tbody>
            <tr v-for="(row, index) in rows" :key="index">
                <td v-for="(columna, index) in columnas" :key="index">
                    <div v-if="columna.valueAux">
                        {{ evaluarVariableString(row, columna.valueAux) }}
                    </div>
                    <div v-else>
                        {{ row[columna.value] }}
                    </div>
                </td>

                <td>
                    <a href="#" v-on:click.prevent="pasarAEdicion(row)">
                        <i class="fas fa-edit"></i></a>
                    &nbsp;
                    <a href="#" v-on:click.prevent="deleteRow(row[props.parameterRouteName])">
                        <i class="fas fa-trash-alt"></i></a>
                    &nbsp;

                    <a v-if="props.modalShow" v-on:click.prevent="emit('openModalShow', row)" href="#">
                        <i class="fas fa-eye"></i>
                    </a>

                    <router-link v-if="props.config.show" :to="'/'+props.model+'/'+row[props.parameterRouteName]" >
                        <i class="fas fa-eye"></i>
                    </router-link>
                    &nbsp;
                    <a v-if="props.fatherField != ''" href="#" v-on:click.prevent="pasarAModoAdd(row[props.parameterRouteName])">
                        Agregar hijo
                    </a>
                </td>
            </tr>
        </tbody>
    </table>
</template>