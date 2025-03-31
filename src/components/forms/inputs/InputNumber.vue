<script setup lang="ts">
    const emit = defineEmits(['input']);
    const props = defineProps({
        name:{
            required: true,
            type: String
        },
        value:{
            required: false,
            type: [String, Number],
            default: ''
        },
        max:{
            required: true,
            type: Number
        },
        min:{
            required: true,
            type: Number
        },
        step:{
            required: false,
            type: Number,
            default: 1
        }
    });
</script>


<template>
    <span>
        <label class="form-label" :for="name">
            <slot></slot>
        </label>
        <input  type="number"
                class="form-control form-control-sm"
                v-bind:name="name"
                v-bind:id="name"
                v-bind:value="value"
                v-bind:max="max"
                v-bind:min="min"
                v-bind:step="step"
                v-on:input="emit('input', $event.target.value)"
                >
    </span>
</template>