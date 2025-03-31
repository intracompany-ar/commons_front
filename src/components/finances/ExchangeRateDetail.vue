<script setup lang="ts">
defineProps(['data'])

</script>

<template>
    <h6 class="text-center bg-success bg-opacity-50 p-1 m-0"><slot></slot> {{ data.venta }}</h6>
    <small><small class="text-muted">Precio Vta al {{ data.fecha }}. Cierre de ayer: {{ data.valor_cierre_ant }}. </small></small>
</template>