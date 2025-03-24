<script setup>
import { ref, onMounted } from 'vue'

const RANDOM_ID = Math.round(Math.random() * 10000000);

const emit = defineEmits(['loaded'])

const model = defineModel()
const text = defineModel('text')

const props = defineProps({
    name: { required: false, type: String, default: 'base_id' },
    id: { required: false, type: String, default: 'base_id' },
    model: { required: true, type: String },
    customUrl: { required: false, type: String, default: '' },

    params: { required: false, type: Object, default() { return {} } },
    config: {
        required: false, type: Object, default() { return {
            incluyeTodos: false,
            getOnDemand: false,
            formFloating: false,
            required: false,
            sm: false,
            withoutLabel: false,
            useIndex: false,
            todosValueEmptyString: false,
            border: false
        }}
    },

    appendOptions: { required: false, type: Array, default() { return [] } },
});

const rows = ref([]);

onMounted(() => { if(!props.config.getOnDemand){ getRows() } })

defineExpose({ getRows })
function getRows(paramsParam = {}) {
    
    var params = paramsParam ? { ...props.params, ...paramsParam } : props.params;
    var url =   props.customUrl == '' ? (props.config.useIndex ? props.model : `${props.model}/select`) : props.customUrl;

    axios(url , {params: params})
        .then(response => {
            rows.value = response.data
            emit('loaded')
        })
}
</script>


<template>
    <div :class="{ 'form-floating': props.config.formFloating }">
        <label v-if="!props.config.formFloating && !props.config.withoutLabel" :for="props.id+RANDOM_ID" class="form-label"><slot></slot></label>
        <select class="form-control" :class="{ 'form-control-sm': props.config.sm, 'border border-2 border-primary': props.config.border }"  :id="props.id+RANDOM_ID" :name="props.name" :required="props.config.required" 
            v-model="model"
            v-on:change="text = $event.target.options[$event.target.selectedIndex].text"
            >
            <option :value="props.config.todosValueEmptyString ? '': 0" v-if="props.config.incluyeTodos" selected>Todas</option>
            
            <template v-for="row in rows" :key="row.id">
                <option :value="row.id">
                    {{  row.name }}
                </option>
            </template>

            <option v-for="additional in props.appendOptions" :value="additional.value" :key="additional.id">
                {{ additional.label }}
            </option>
        </select>

        <label v-if="props.config.formFloating" class="form-label" :for="props.id+RANDOM_ID"><slot></slot></label>
    </div>
</template>