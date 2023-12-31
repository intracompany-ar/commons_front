<script setup>
    const props = defineProps({
        id:{ required: false, type: String, default: 'button_submit' },
        big:{ required: false, type: Boolean, default: false }
    });
</script>

<template>
    <span>
        <button type="submit" class="btn btn-secondary btn-neuper mt-2" v-bind:class="{'big': props.big}" v-bind:id="props.id"><slot>ENVIAR</slot></button>
    </span>
</template>

