<script setup>
const emit = defineEmits(['click']);
const props = defineProps(['icon', 'theme', 'modalId']);
</script>

<template>
    <div class="col-4 col-md-12 col-md mb-2 d-grid gap-2">
        <button type="button" v-bind:class="'text-start btn btn-' + props.theme"
            v-bind:data-bs-target="props.modalId ? '#' + props.modalId : false"
            v-bind:data-bs-toggle="props.modalId ? 'modal' : false" v-on:click.prevent="emit('click')">
            <i v-bind:class="props.icon"></i>
            <slot></slot>
        </button>
    </div>
</template>

