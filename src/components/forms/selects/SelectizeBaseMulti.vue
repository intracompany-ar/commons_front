<script setup lang="ts">
import { watch, ref, onMounted } from 'vue'
import '@selectize/selectize'

const model = defineModel()

const props = defineProps({
    model: { type: String, required: true },
    id: {required: false, type: String, default: 'selectize-base'},
    config: {required: false, type: Object, default: {
        useIndex: false,
        setOnDemand: false,
    }},
})

const id = ref(props.id+'-'+Math.random().toString(36).substring(7));

const rows = ref([]);
onMounted(() => {
    console.debug('SelectizeBaseMulti mounted', props.model, id.value);
    if(!props.config.setOnDemand) {
        setSelectize();
    }
})

defineExpose({ setSelectize })

// Artilugio de ChatGPT para usar este componente sucesivamente en openModal
watch(model, (newVal) => {
    const selectize = $('#' + id.value)[0]?.selectize
    if (!selectize) return

    // Limpiar todo antes de setear nuevos valores
    selectize.clear(true) // ← ⚠️ true evita que dispare 'change'

    let valores = []

    if (Array.isArray(newVal)) {
        valores = newVal.map(item => item?.id ?? item).filter(Boolean)
    } else if (typeof newVal === 'string' && newVal !== '') {
        valores = newVal.split(',').map(v => v.trim()).filter(Boolean)
    }

    if (valores.length > 0) {
        selectize.setValue(valores, true) // true: no trigger 'change'
    }
})

async function setSelectize(){
    console.debug('SelectizeBaseMulti SET', rows.value);
    const input = $('#'+id.value)
    if (input[0]?.selectize) {
        input[0].selectize.destroy()
    }
    const response = await axios(props.model+(props.config.useIndex ? '': '/select'))
    rows.value = response.data;
    let elementosSeleteds = (typeof  model.value === 'string' ) ? model.value : (model.value ? (model.value.map(item => item.id ?? item)) : [])
    
    input.selectize({
        plugins: ['restore_on_backspace', 'remove_button'],
        delimiter: ',',
        persist: false,
        valueField: 'id',
        labelField: 'name',
        searchField: ['name'],
        options: rows.value,
        items: elementosSeleteds,
        create(input) {
            return {
                value: input,
                text: input
            }
        },
        onChange: async function(value) { 
            model.value = value; 
        }
    });
    console.debug('Selectize inicializado con', rows.value, model.value);
}
</script>

<template>
    <label class="form-label" :for="id"><slot>Elemento</slot></label>
    <input type="text" :id="id" :name="id"/>
</template>
