<script setup>
    import { ButtonSubmit } from './ButtonSubmit.vue'
    const props = defineProps({
        id:{ required: false, type: String, default: 'button_submit' },
        big:{ required: false, type: Boolean, default: false }
    })
</script>

<template>
    <div class="row">
        <div class="col-12">
            <div class="text-center">
                <ButtonSubmit v-bind:big="props.big" v-bind:id="props.id"><slot>GUARDAR</slot></ButtonSubmit>
            </div>
        </div>
    </div>
</template>