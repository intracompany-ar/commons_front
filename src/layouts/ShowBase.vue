<script setup lang="ts">
import {ref, watch} from 'vue'
import { useRoute, useRouter } from 'vue-router'
const $router = useRouter();
const $route = useRoute();

const model = defineModel()

const emit = defineEmits(['fetched'])

const props = defineProps({
    modelName: {required: true, type: String},
    paramIdName: {default: 'id', type: String, required: false},
    customUrl: {default: '', type: String, required: false},
    params: {default: {}, type: Object, required: false},
})

const loading = ref(false)
const error = ref(null)

watch(() => $route.params[props.paramIdName], fetchData, { immediate: true })

defineExpose({ fetchData })
async function fetchData() {
    if($route.params[props.paramIdName]){
        error.value = model.value = null
        loading.value = true
        try {
            // replace `getPost` with your data fetching util / API wrapper
            let url = (props.customUrl != '' ? props.customUrl : props.modelName)+'/' + $route.params[props.paramIdName];
            model.value = await axios(url, {params: props.params ?? {}})
                .then(response => response.data)
            emit('fetched')
        } catch (err) {
            error.value = err.toString()
        } finally {
            loading.value = false
        }
    }else{
        model.value = {}
    }
}
</script>

<template>
    <Teleport to="#title-banner">
        <a class="btn btn-warning my-2" v-on:click="$router.go(-1)"><i class="fa-solid fa-chevron-left"></i> VOLVER</a>
        <h4  class="pt-2"><slot name="title"></slot></h4>
    </Teleport>

    <div class="m-2">
        <h4 v-if="loading" class="loading text-danger">Cargando datos, por favor, espere...</h4>
        <div v-if="error" class="error">{{ error }}</div>
    </div>
    
    <div v-if="model" class="content p-4" >
        <slot></slot>
    </div>

    <div class="row">
        <div class="col-12 text-end">
            <slot name="buttons"></slot>
            <button class="btn btn-warning m-2" v-on:click.prevent="$router.push(`/${props.modelName}/${model[props.paramIdName]}/edit`)">Editar</button>
        </div>
    </div>
</template>