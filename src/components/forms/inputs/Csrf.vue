<!-- Este no lo estoy usando en ningún lado, no vale la pena, conviene poneer el input directamente con el csrf -->
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