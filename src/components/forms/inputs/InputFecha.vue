<script setup>
const emit = defineEmits(['input']);
const props = defineProps({
    name: { required: true, type: String },
    id: { required: false, type: String, default: 'input_fecha' },
    value: { required: false, type: String },
    max: { required: false, type: Date },
    min: { required: false, type: Date },
    readonly: { required: false, type: Boolean, default: false },
    required: { required: false, type: Boolean, default: false },
    small: { required: false, type: Boolean, default: true }
});
</script>

<template>
    <label class="form-label" v-bind:for="props.id">
        <slot></slot>
    </label>
    <input type="date" class="form-control" v-bind:class="{ 'form-control-sm': props.small }" v-bind:name="props.name"
        v-bind:id="props.id" v-bind:value="props.value" v-on:input="emit('input', $event.target.value)"
        v-bind:max="props.max" v-bind:min="props.min" v-bind:readonly="props.readonly" v-bind:required="props.required">
</template>