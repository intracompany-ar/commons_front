<script setup>
import { ref, watch } from 'vue';
import dayjs from 'dayjs'

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
    id: { required: false, type: String, default: 'desde' },
    name: { required: false, type: String, default: 'desde' },
    big: { required: false, type: Boolean, default: false },
    dias: { required: false, type: [String, Number], default: 30 },
    modelValue: { required: false, type: String, default: () => { return '' } }
})

const localValue = ref(props.modelValue)
localValue.value = dayjs().subtract(props.dias, 'day').format('YYYY-MM-DD')

watch(() => props.modelValue, (newVal) => { localValue.value = newVal })
watch(localValue, (newVal) => { emit('update:modelValue', newVal) })
</script>

<template>
    <label class="form-label" :for="props.id">
        <slot>Desde:</slot>
    </label>
    <input type="date" class="form-control" :class="{ 'form-control-sm': !props.big }" :name="props.name" :id="props.id" v-model="localValue">
    <!-- <InputFechaDesde dias="30"></InputFechaDesde> -->
</template>

