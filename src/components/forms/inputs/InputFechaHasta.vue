<script setup>
const emit = defineEmits(['input']);
const props = defineProps({
    id: { required: false, type: String, default: 'hasta' },
    name: { required: false, type: String, default: 'hasta' },
    big: { required: false, type: Boolean, default: false },
    value: {
        required: false, type: String, default: () => {
            let f = new Date();
            let mes = (f.getMonth() < 9) ? '0' + (f.getMonth() + 1) : (f.getMonth() + 1);
            let dia = (f.getDate() < 10) ? '0' + (f.getDate()) : f.getDate();
            return f.getFullYear() + "-" + mes + "-" + dia;
        }
    }
});
</script>

<template>
    <div>
        <label class="form-label" v-bind:for="id">
            <slot>Hasta:</slot>
        </label>
        <input type="date" class="form-control" v-bind:class="{ 'form-control-sm': !big }" v-bind:name="name" v-bind:id="id"
            v-bind:value="value" v-on:input="emit('input', $event.target.value)">
    </div>
</template>

