<script setup lang="ts">
const emit = defineEmits(['click']);
const props = defineProps({
    link: { required: false, default: null, type: String },
    click: { required: false, default: '', type: String },
    disabled: { required: false, default: false, type: Boolean }
});
</script>

<template>
    <a v-bind:href="props.link" v-on:click="emit('click')" class="btn btn-outline-secondary"
        v-bind:class="{ 'disabled': props.disabled }" accesskey="B">
        <i class="fas fa-sync-alt" aria-hidden="true" style="cursor: pointer; color: rgb(106,108,106);"></i>
    </a>
</template>