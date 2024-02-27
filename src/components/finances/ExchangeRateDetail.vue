<script setup>
defineProps(['data'])

</script>

<template>
    <h5>
        <slot></slot>
    </h5>
    <h5 class="text-center bg-success text-white p-1">{{ data.venta }}</h5>
    <small>Precio Vta al {{ data.fecha }}
        <br>
    Cierre de ayer: {{ data.valor_cierre_ant }}</small>
</template>