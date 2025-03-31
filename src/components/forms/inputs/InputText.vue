<script setup lang="ts">
    const emit = defineEmits(['input']);
    const props = defineProps({
        name:{
            required: true,
            type: String
        },
        value:{
            required: false,
            type: String,
            default: ''
        },
        max:{
            required: true,
            type: Number
        },
        readonly:{
            required: false,
            type: Boolean,
            default: false
        },
        required:{
            required: false,
            type: Boolean,
            default: false
        }
    });
</script>


<template>
    <div>
        <label class="form-label" v-bind:for="props.name">
            <slot></slot>
        </label>
        <input  type="text"
                class="form-control form-control-sm"
                v-bind:name="props.name"
                v-bind:id="props.name"
                v-bind:value="props.value"
                v-on:input="emit('input', $event.target.value)"
                v-bind:maxlength="props.max"
                v-bind:readonly="props.readonly"
                v-bind:required="props.required"
                >
    </div>
</template>