<script setup>
import { ref, onMounted } from 'vue'
import '@selectize/selectize'

const model = defineModel()
const text = defineModel('text')

const emit = defineEmits(['mounted'])

const RANDOM_ID = Math.round(Math.random() * 10000000);


const props = defineProps({
    name: { required: false, default: 'selectize_base_id', type: String },
    id: { required: false, type: String, default: 'selectize_base_id' },
    model: { required: true, type: String },

    customUrl: { required: false, default: '', type: String },
    params: { required: false, default: () => { return {} } },

    config: { required: false, default: () => { return { 
        getRowsOnDemand: false,
        incluyeTodos: false,
        useIndex: false,
        sm: false,
        withoutLabel: false,
    } } }
});

const rows = ref([]);

onMounted(() => { 
    emit('mounted')
    if (!props.config.getRowsOnDemand) { getRows() } 
})

defineExpose({ getRows, reset })
function getRows(paramsParam = {}) {
    var params = paramsParam ? { ...props.params, ...paramsParam } : props.params;
    var url = props.customUrl == '' ? (props.config.useIndex ? props.model : `${props.model}/select`) : props.customUrl;
    
    axios(url, { params: params})
        .then(response => {
            rows.value = response.data;
            $("#" + props.id+RANDOM_ID).selectize()[0]?.selectize?.destroy();
            $("#" + props.id+RANDOM_ID).selectize({
                valueField: 'id',
                labelField: 'name',
                searchField: ['name'],
                options: rows.value,
                items: [model.value],
                onChange: function (valueSelected, isOnInitialize) { 
                    model.value = valueSelected  
                    text.value = this.options[valueSelected]?.name;
                }
            });
        })
}

function reset(){ 
    model.value = ''; 
    $("#" + props.id+RANDOM_ID).selectize()[0]?.selectize?.clear();
}
</script>

<template>
    <label v-if="!props.config.withoutLabel" class="form-label" :for="props.id+RANDOM_ID"><slot></slot></label>
    <select class="form-control" :class="{'form-control-sm': props.config.sm}" :name="props.name" :id="props.id+RANDOM_ID" v-model="model"></select>
</template>