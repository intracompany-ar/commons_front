<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { useFetch } from './../../../composables/useFetch.ts';
const {rows, setRows} = useFetch();

const model = defineModel();

const props = defineProps({
    name: { required: false, default: 'filtro_sucursal', type: String },
    id: { required: false, type: String, default: 'filtro_sucursal' },

    companyId: { required: false, type: [String, Number], default: 0 },

    config: {
        required: false, type: Object, default: () => ({
            incluyeTodos: false,
            usarSucCxId: false,
            sm: false
        })
    },
});

onMounted(() => getRows() )

watch(() => props.companyId, async () => { getRows() })

function getRows() {
    let companyId = props.companyId ?? 0;
    setRows(`sucursal/select/${companyId}`, { callback: callback});
}

// Dejo seleccionada la primera opción, sino queda en blanco
function callback()
{
    if (document.getElementById(props.id)) {
        document.getElementById(props.id).value = $("#" + props.id + " option:first").val();
    }
}
</script>


<template>
    <label class="form-label" :for="props.id"><slot>Sucursal</slot></label>
    <select class="form-control" :class="{ 'form-control-sm': props.config.sm }" :name="props.name" :id="props.id" v-model="model">
        <option value="0" v-if="props.config.incluyeTodos">Todas</option>
        <option v-for="row in rows" :value="props.config.usarSucCxId ? row.suc_cx_id : row.id" :key="row.id">
            {{ row.name }} · #{{ row.id }}
        </option>
    </select>
</template>