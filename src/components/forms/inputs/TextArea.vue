<script setup lang="ts">
    const props = defineProps({
        name:{
            required: true,
            type: String
        },
        value:{
            required: true,
            type: String
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
        readonly:{
            required: false,
            type: Boolean,
            default: false
        },
        placeholder:{
            required: false,
            type: String,
            default: ''
        },
        rows:{
            required: false,
            type: String,
            default: '30'
        },
        cols:{
            required: false,
            type: String,
            default: '8'
        }
    });
</script>

<template>
    <span>
        <label class="form-label" v-bind:for="props.name">
            <slot></slot>
        </label>
        <textarea
                class="form-control form-control-sm"
                v-bind:name="props.name"
                v-bind:id="props.name"
                v-bind:maxlength="props.max"
                v-bind:readonly="props.readonly"
                v-bind:required="props.required"
                v-bind:placeholder="props.placeholder"
                v-bind:cols="props.cols"
                v-bind:rows="props.rows"
                >
                {{ props.value }}
                </textarea>
    </span>
</template>