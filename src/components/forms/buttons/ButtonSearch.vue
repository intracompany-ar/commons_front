<script setup>
const emit = defineEmits(['click']);
const props = defineProps({
    countRows: { required: false, type: Number, default: 0 },
    max: { required: false, type: Number, default: 0 },
    disabled: { required: false, type: Boolean, default: false }
});
</script>

<template>
    <button type="submit" v-on:click.prevent="emit('click')" class="btn btn-primary rounded-circle pb-1" style="width: 45px; height: 45px; color: rgb(106,108,106);" accesskey="B" :disabled="props.disabled" >
        <i class="fas fa-search fa-3x" style="color: #ffffff; font-size: 1.25em;"></i>
        <slot></slot>
    </button>

    <div v-if="props.max > 0 && props.countRows == props.max" class="alert alert-warning p-1" role="alert">
        <small><small>
            Se han alcanzado las {{ props.max }} filas, es probable que algunos registros no se estén mostrando. Se
            recomienda acotar
            el rango de búsqueda utilizando los filtros.
        </small></small>
    </div>
</template>