<script setup>
import { ref, onMounted } from 'vue'
import '@selectize/selectize'

const model = defineModel()

const props = defineProps({
    model: { type: String, required: true },
    id: {required: false, type: String, default: 'selectize-base'},
    config: {required: false, type: Object, default: {
        useIndex: false
    }},
})

const id = ref(props.id+'-'+Math.random().toString(36).substring(7));

const rows = ref([]);
onMounted(() => {
    axios(props.model+(props.config.useIndex ? '': '/select'))
        .then(response => {
            rows.value = response.data;
            $('#'+id.value).selectize({
                plugins: ['restore_on_backspace', 'remove_button'],
                delimiter: ',',
                persist: false,
                valueField: 'id',
                labelField: 'name',
                searchField: ['name'],
                options: rows.value,
                items: (typeof  model.value === 'string' ) ? model.value : (model.value ? model.value.map(item => item.id ?? item) : []),
                create(input) {
                    return {
                        value: input,
                        text: input
                    }
                },
                onChange: function(value) { model.value = value; }
            });
        })
})
</script>


<template>
    <label class="form-label" :for="id"><slot>Elemento</slot></label>
    <input type="text" :id="id" :name="id"/>
</template>