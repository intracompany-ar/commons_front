<script setup>
import { onMounted } from 'vue';
import dayjs from 'dayjs';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
    dias: { required: false, type: [String, Number], default: 30 },
    modelValue: { required: false },
    big: { required: false, type: Boolean, default: false },
    name: { required: false, type: String, default: 'desde' },
    id: { required: false, type: String, default: 'desde' }
})

onMounted(() => {
    const el = document.getElementById(props.id);
    if (el) {
        el.value = dayjs().subtract(props.dias, 'days').format("YYYY-MM-DD")
    }

})
</script>

<template>
    <label class="form-label" v-bind:for="props.id">Desde:</label>
    <input type="date" class="form-control" v-bind:class="{ 'form-control-sm': !props.big }" v-bind:name="props.name"
        v-bind:id="props.id" v-on:input="emit('update:modelValue', $event.target.value)">
    <!-- <InputFechaDesde dias="30"></InputFechaDesde> -->
</template>

