<script setup>
import dayjs from 'dayjs'

const model = defineModel({default: dayjs().format('YYYY-MM-DD')})

const props = defineProps({
    id: { required: false, type: String, default: 'hasta' },
    name: { required: false, type: String, default: 'hasta' },
    big: { required: false, type: Boolean, default: false }
})

</script>

<template>
    <label class="form-label" :for="id"><slot>Hasta:</slot></label>
    <input type="date" class="form-control" :class="{ 'form-control-sm': !big }" :name="name" :id="id" v-model=" model" />
</template>