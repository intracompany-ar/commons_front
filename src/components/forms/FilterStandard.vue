<script setup>
import { computed, ref, useSlots } from 'vue'
import InputFechaHasta from './inputs/InputFechaHasta.vue';
import InputFechaDesde from './inputs/InputFechaDesde.vue';
import ButtonPlus from './buttons/ButtonPlus.vue';
import ButtonSearch from './buttons/ButtonSearch.vue';
import SelectBase from './selects/SelectBase.vue';
import SelectBranchOffice from './selects/SelectBranchOffice.vue';
const slots = useSlots()

const TRIBUTARY_ID_DEFAULT = 30708030577 // Neuper

const emit = defineEmits(['click', 'create']);

const from = defineModel('from')
const to = defineModel('to')
const company = defineModel('company', {default: TRIBUTARY_ID_DEFAULT});
const sucursal = defineModel('sucursal', {default: 0});

const toggleHiddenFilters = ref(false)

const slotHiddenHasContent = computed(() => !!slots.hidden && slots.hidden().length > 0)

defineProps({
    config: {
        required: false, type: Object, default: () => ({
            companyIncluyeTodos: false,
            company: false,

            sucursalesincluyeTodos: false,
            sucursales: false,
            usarSucCxId: false,

            getRows: false,
            from: false,
            to: false,
            createModal: false,

            sm: false,
            buttonCreate: false, // Es para agregar el botón sin modal ni link, solo se emite el evento create
            datesSide: false
        })
    },

    urlCreate: { required: false, type: [String, Object], default: '' },
    diasFrom: { required: false, type: Number, default: 30 },
    id: { required: false, type: String, default: null },
    maxRows: { required: false, type: Number, default: null },
})

const showHiddenFilters = () => {
    toggleHiddenFilters.value = !toggleHiddenFilters.value
}
</script>

<template>
    <form class="d-flex justify-content-between bg-secondary bg-opacity-25 p-2 m-0 mb-4">
        <div class="row w-100">
            <div class="col-2 pt-2" v-if="urlCreate || config.buttonCreate">
                <ButtonPlus :link="urlCreate" :modal="config.createModal" v-on:click="emit('create')"/>
            </div>

            <div class="col-md-2 col-6" v-if="config.company || config.companyIncluyeTodos">
                <SelectBase model="company" :id="'company_id'+id" :config="{ incluyeTodos: config.companyIncluyeTodos }" v-model="company">Empresa</SelectBase>
            </div>

            <div class="col-6 col-md-2" v-if="config.sucursales">
                <SelectBranchOffice
                    :config="{ incluyeTodos: config.sucursalesincluyeTodos, usarSucCxId: config.usarSucCxId, sm: config.sm }"
                    :id="'filter-sucursal-id-' + id" v-model="sucursal" />
            </div>

            <div class="col-md-2 col-6" v-if="config.from || config.to">
                <InputFechaDesde v-if="config.from" v-model="from" :dias="diasFrom" :id="id ? 'from_' + id : null">Desde</InputFechaDesde>
                <InputFechaHasta v-if="!config.datesSide && config.to" v-model="to" :id="id ? 'to_' + id : null">Hasta</InputFechaHasta>
            </div>
            <div class="col-md-2 col-6" v-if="config.datesSide">
                <InputFechaHasta v-if="config.to" v-model="to" :id="id ? 'to_' + id : null">Hasta</InputFechaHasta>
            </div>

            <slot></slot>

            <div class="row" v-show="toggleHiddenFilters">
                <slot name="hidden"></slot>
            </div>
        </div>
        <div class="col-1 text-end pt-2">
            <ButtonSearch v-if="config.getRows" v-on:click="emit('click')" :max="maxRows ?? 0" />
            <br>
            <button v-if="slotHiddenHasContent" type="button" v-on:click.prevent="showHiddenFilters" class="btn btn-secondary mt-2 me-1 p-1 pe-0">
                <small class="text-white me-2"><small><small>+ Filtros <i class="fa-solid fa-filter"></i></small></small></small>
            </button>
            <br>
        </div>
    </form>
</template>