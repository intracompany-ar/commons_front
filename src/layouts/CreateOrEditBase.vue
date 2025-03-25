<script setup>
import {ref, watch} from 'vue'
import axios from 'axios';
import { disableSubmits, enableSubmits, useStoreAdvices } from 'commons_front'
import { useRoute, useRouter } from 'vue-router'
const $route = useRoute();
const $router = useRouter();
const storeAdvices = useStoreAdvices()

const model = defineModel()

const emit = defineEmits(['saving', 'creating', 'created', 'fetched'])

const props = defineProps({
    modelName: {required: true, type: String},
    enctype: {default: false, type: String, default: 'application/json'},
    hideButtonSubmit: {default: false, type: Boolean},

    customShowUrl: {required: false, default: null, type: String},
    routeBack: {required: false, default: null, type: String},
})

const loading = ref(false)
const error = ref(null)

enableSubmits();


watch(() => $route.params.id, fetchData, { immediate: true })

defineExpose({ fetchData })
async function fetchData() {
    if($route.params.id){
        error.value = model.value = null
        loading.value = true
        try {
            // replace `getPost` with your data fetching util / API wrapper
            model.value = await axios((props.customShowUrl ?? props.modelName) +'/' + $route.params.id)
                .then(response => response.data)
        } catch (err) {
            error.value = err.toString()
        } finally {
            loading.value = false;
            emit('fetched')
        }
    }else{
        model.value = model.value && model.value != {} ? model.value : {}
    }
}

function store()
{
    emit('saving')
    emit('creating')
    disableSubmits();
    // Filtrar valores null
    const filteredRow = Object.fromEntries(
        Object.entries(model.value).filter(([_, value]) => value !== null)
    );

    const data = props.enctype === 'multipart/form-data' ? convertToFormData(filteredRow) : filteredRow
    axios.post(props.modelName, data, {headers: {'Content-Type': props.enctype}})
        .then(response => { 
            storeAdvices.success(props.modelName+' insertado');
            emit('created', response.data)
            if(props.routeBack) 
            {
                $router.push(props.routeBack);
            }else{
                $router.go(-1);
            }
        })
        .catch(error => { console.log(error) })
        .then(() => enableSubmits())
}

function update(itemId)
{
    emit('saving')
    // Filtrar valores null
    const filteredRow = Object.fromEntries(
        Object.entries(model.value).filter(([_, value]) => value !== null)
    );

    if(props.enctype === 'multipart/form-data'){
        const data = convertToFormData(filteredRow, true)
        axios.post(props.modelName+'/' +itemId, data, {headers: {'Content-Type': props.enctype}})
            .then(response => { 
                if(!response.data.message){
                    storeAdvices.success(props.modelName+' actualizado');
                }
                $router.go(-1); 
            })
            .catch(error => { console.log(error) })
    }else{
        const data = filteredRow
        axios.put(props.modelName+'/' +itemId, data)
            .then(response => { 
                storeAdvices.success(props.modelName+' actualizado');
                $router.go(-1); 
            })
            .catch(error => { console.log(error) })
    }
}

const convertToFormData = (obj, addPutMethod = false, formData = new FormData(), parentKey = '') => {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            const formKey = parentKey ? `${parentKey}[${key}]` : key;

            if (value === null || value === undefined) continue;

            if (value instanceof File) { // input file
                formData.append(formKey, value);
            } else if (Array.isArray(value)) { // input multiple files
                value.forEach((v, index) => {
                    if (v instanceof File) {
                        formData.append(`${formKey}[${index}]`, v);
                    } else if (typeof v === 'object') {
                        // En caso de que sean arrays de objetos (poco común en este caso)
                        convertToFormData(v, false, formData, `${formKey}[${index}]`);
                    } else {
                        formData.append(`${formKey}[${index}]`, v);
                    }
                });

            } else if (typeof value === 'object' && value !== null && !(value instanceof Date)) {
                // Subobjetos no los estoy agregando por ahora
                // convertToFormData(value, false, formData, formKey);// Me lo pasó chatgpt, aún no lo probé
            } else {
                console.debug(formKey, value)
                formData.append(formKey, value);
            }
        }

    }
    if(addPutMethod)
    {
        formData.append('_method', 'PUT');
    }
    console.debug(formData)
    return formData;
};
</script>

<template>
    <Teleport to="#title-banner">
        <a class="btn btn-warning my-2" v-on:click="$router.go(-1)"><i class="fa-solid fa-chevron-left"></i> VOLVER</a>
        <h4 class="pt-2"><slot name="title"></slot></h4>
    </Teleport>

    <div class="m-0">
        <h4 v-if="loading" class="loading text-danger">Cargando datos, por favor, espere...</h4>
        <div v-if="error" class="error">{{ error }}</div>
    </div>

    <div v-if="model" class="content bg-secondary bg-opacity-25 rounded p-4" >
        <form method="post" v-on:submit.prevent="model.id ? update(model.id) : store()" :enctype="props.enctype">
            <input type="hidden" name="id" v-model="model.id">
            <slot></slot>
            <div class="row" v-if="!props.hideButtonSubmit">
                <div class="col-12 text-center pt-4">
                    <button type="submit" class="btn btn-success btn-iceo btn-lg">GUARDAR</button>
                </div>
            </div>
        </form>
        <small class="mt-4 text-muted">* Campos obligatorios</small>
    </div>
</template>

<style>
    input[required] {
        background-color: rgb(255,255,255);
    }

    textarea[required] {
        background-color: rgb(255,255,255);
    }
</style>