<script setup>
import { ref, watch } from 'vue'
import dayjs from 'dayjs'


const emit = defineEmits(['update:modelValue']);

const props = defineProps({
    id: { required: false, type: String, default: 'hasta' },
    name: { required: false, type: String, default: 'hasta' },
    big: { required: false, type: Boolean, default: false },
    modelValue: { required: false, type: String, default: () => { return dayjs().format('YYYY-MM-DD') } }
})

const localValue = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => { localValue.value = newVal })
watch(localValue, (newVal) => { emit('update:modelValue', newVal) })
</script>

<template>
    <label class="form-label" :for="id">
        <slot>Hasta:</slot>
    </label>
    <input type="date" class="form-control" :class="{ 'form-control-sm': !big }" :name="name" :id="id" v-model="localValue" />
</template>

