<script setup>
const props = defineProps({
    id: { required: true, type: String },
    heads: { required: true, type: Array },
    headDark: { required: false, type: Boolean, default: false },
    striped: { required: false, type: Boolean, default: true },
    bordered: { required: false, type: Boolean, default: true },
    compactLevel: { required: false, type: Number, default: 0 },
});
</script>

<template>
    <div class="row">
        <div class="col-12">
            <table class="table table-sm table-hover compact" width="100%" cellspacing="0" border="1"
                v-bind:id="props.id" v-bind:class="{ 'table-striped': props.striped, 'table-bordered': props.bordered }">
                <thead v-bind:class="{ 'table-dark': props.headDark }">
                    <tr class="thead-inverse">
                        <th scope="col" v-for="(item, index) in props.heads" v-bind:key="index">
                            {{ item }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <slot></slot>
                </tbody>
                <tfoot>
                    <slot name="foot"></slot>
                </tfoot>
            </table>
        </div>
    </div>
</template>