<script setup>
import { onMounted } from 'vue';
import dayjs from 'dayjs'

const props = defineProps({
    id: { required: false, type: String, default: 'desde' },
    name: { required: false, type: String, default: 'desde' },
    big: { required: false, type: Boolean, default: false },
    dias: { required: false, type: [String, Number], default: 30 },
})

const model = defineModel()
onMounted(() => {
    model.value = dayjs().subtract(props.dias, 'day').format('YYYY-MM-DD')
})
</script>

<template>
    <label class="form-label" :for="props.id"><slot>Desde:</slot></label>
    <input type="date" class="form-control" :class="{ 'form-control-sm': !props.big }" :name="props.name" :id="props.id" v-model="model">
</template>

