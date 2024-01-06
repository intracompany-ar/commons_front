<script setup>
defineProps(['data'])

</script>

<template>
    <h5>
        <slot></slot>
    </h5>
    Vta <b>{{ data.venta }}</b>
    <small> al {{ data.fecha }}</small>
    <br>
    <small>Cierre de ayer: {{ data.valor_cierre_ant }}</small>
</template>