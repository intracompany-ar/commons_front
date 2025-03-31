<script setup lang="ts"> 
    const emit = defineEmits(['click']); 
    const props = defineProps(['href']); 
</script>

<template>
    <a class="btn btn-outline-primary btn-sm" v-bind:href="props.href" v-on:click="emit('click')">
        <i class="fas fa-comment-dots"></i> <small>Comentarios</small>(<slot></slot>)
    </a>
</template>