<script setup>
const model = defineModel();

const props = defineProps({
    id:{ required: false, type: String, default: 'tributary_id' }, 
    name:{ required: false, type: String, default: 'tributary_id' },
    small:{ required: false, type: Boolean, default: true },
    label:{ required: false, type: Boolean, default: true },
    required:{ required: false, type: Boolean, default: false },
    readonly:{ required: false, type: Boolean, default: false }
});
</script>

<template>
    <label v-if="props.label" class="form-label" v-bind:for="props.id"><slot></slot></label>
    <input  type="number" 
            max="99999999999" 
            min="9999999999"
            class="form-control" 
            placeholder="CUIT" 
            
            :class="{'form-control-sm': props.small}"   
            :name="props.name"    
            :id="props.id" 
            :required="props.required"
            :readonly="props.readonly"

            v-model="model"
        />
</template>