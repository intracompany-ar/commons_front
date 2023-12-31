<script setup>
import { ref, onMounted } from 'vue'

const csrf = ref(0);

onMounted(() => {
    csrf.value = document.head.querySelector('meta[name="csrf-token"]') ? document.head.querySelector('meta[name="csrf-token"]').content : 0;
});
</script>

<template>
    <input type="hidden" name="_token" v-model="csrf" />
</template>