<script setup lang="ts">
const RANDOM_NUMBER = Math.round(Math.random() * 10000000)
const emit = defineEmits(['update:modelValue']);
const props = defineProps(
    {
        modelValue: { required: false, type: [String, Number], default: '1' },
        darkDisabled: { required: false, type: [Boolean], default: true }
    }
);
</script>

<template>
    <div class="btn-group" role="group" aria-label="luz">
        <input type="radio" class="btn-check" name="line" v-bind:id="'claro0' + RANDOM_NUMBER" :value="1" autocomplete="off"
            v-on:change="emit('update:modelValue', $event.target.value)" :checked="modelValue == 1">
        <label class="btn btn-outline-info pb-2" v-bind:for="'claro0' + RANDOM_NUMBER">OL1</label>

        <input type="radio" class="btn-check" name="line" v-bind:id="'claro1' + RANDOM_NUMBER" :value="0" :checked="modelValue === '0'"
            v-on:change="emit('update:modelValue', $event.target.value)" v-bind:disabled="darkDisabled">
        <label class="btn btn-outline-dark" v-bind:for="'claro1' + RANDOM_NUMBER">OL2</label>
    </div>
</template>