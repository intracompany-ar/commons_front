<script setup>
defineProps(['data'])

</script>

<template>
    <h5 class="text-center bg-success text-white p-1"><slot></slot> {{ data.venta }}</h5>
    <small>Precio Vta al {{ data.fecha }}. Cierre de ayer: {{ data.valor_cierre_ant }}. <small><small class="text-muted">Fuente: Ámbito</small></small></small>
</template>