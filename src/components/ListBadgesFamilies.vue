<script setup lang="ts">
const props = defineProps(['list', 'bsColor'])
</script>

<template>
    <div>
        <span v-bind:class="'badge rounded-pill bg-' + props.bsColor" v-for="(row, key) in props.list" v-bind:key="key">
            {{ row.code }} {{ row.name }}
        </span>
    </div>
</template>