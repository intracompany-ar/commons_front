<script setup>
import { computed } from "vue";
import { useFetchDatatable } from './../../../src/composables/useFetchDatatable'
import FilterStandard from './../forms/FilterStandard.vue'
import TableStandard from './../TableStandard.vue'
import AdviceNoRecordsToShow from './../AdviceNoRecordsToShow.vue'
const { rows, setRows } = useFetchDatatable()

const props = defineProps(["model", 'columns', 'rowTitle', 'textValue', 'canCrud']);

const heads = computed(() => {
    if (!props.columns) { return [] }
    
    let toReturn = [];
    let thereIsAColumnId = false;
    props.columns.forEach(column => {
        thereIsAColumnId = column.value == 'id' ? true : thereIsAColumnId;
        toReturn.push(column.head)
    });
    if (thereIsAColumnId && props.canCrud) { toReturn.push(''); }
    return toReturn;
})



function getRows() { 
    setRows(props.model, 'table-' + props.model) 
}

function getValue(obj, path, defaultValue = '') {
    return path.split('.').reduce((acc, part) => {
        return acc && acc[part] !== undefined ? acc[part] : undefined;
    }, obj) ?? defaultValue;
}
</script>

<template>
    <FilterStandard :url-create="props.model+'/create'" :config="{ getRows: true }" v-on:click="getRows"/>
    
    <div class="container-fluid">

        <div class="row" v-if="rows.length > 0">
            <div class="col-12">
                <TableStandard :id="'table-' + props.model" :heads="heads">
                    <tr v-for="row in rows" :title="row[props.rowTitle]">
                        <!-- :class="{ 'table-danger': conditionTableDanger }"> -->
                        <td v-for="column in props.columns">
                            {{ column.value
                                ? (row[column.value] ?? getValue(row, column.value, ''))
                                : (column.textValue ?? '') }}
                        </td>
                        <td v-if="props.canCrud && row.id">
                            <!-- <FormEditDelete :urldelete="routerHas(props.model + '.destroy') ?
                                props.model + '.destroy', row.id) : ''"
                                :urledit="routerHas(props.model + '.edit') ? props.model + '.edit', row.id) : ''"
                                frase="Seguro quiere eliminar esta fila?" :id="'form_delete_' + row.id" /> -->
                        </td>
                    </tr>
                </TableStandard>
            </div>
        </div>
        <div class="row" v-else>
            <AdviceNoRecordsToShow />
        </div>
    </div>
</template>