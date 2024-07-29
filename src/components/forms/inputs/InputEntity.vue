<script setup>
const model = defineModel();
    
    const props = defineProps({
        id:{ required: false, type: String, default: 'entity_id' }, 
        name:{ required: false, type: String, default: 'entity_id' },
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
            v-bind:class="{'form-control-sm': props.small}"   
            v-bind:name="props.name"    
            v-bind:id="props.id" 
            placeholder="CUIT" 
            v-bind:value="model"
            v-bind:required="props.required"
            v-bind:readonly="props.readonly"
        />
</template>