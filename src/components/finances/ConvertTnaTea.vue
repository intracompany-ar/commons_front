<script setup lang="ts">
import { ref, computed } from 'vue'
import { tnaToTea, teaToTna } from './../../utils/formulas';

const DEFAULT_TNA = 90;
const DEFAULT_TEA = 90;

const capitalizacion = ref(12);

const tna = ref(DEFAULT_TNA);
const tea2 = ref(DEFAULT_TEA);


const tea = computed(() => { return tnaToTea(tna.value, capitalizacion.value) });
const tna2 = computed(() => { return teaToTna(tea2.value, capitalizacion.value) });
</script>

<template>
    <div class="row">
        <div class="col-6 col-md-4">
            <label>Capitalización:</label>
            <select class="form-control" v-model="capitalizacion">
                <option value="365">Diaria (año de 365 días)</option>
                <option value="360">Diaria (año de 360 días)</option>
                <option value="52">Semanal (52)</option>
                <option value="12">Mensual (12)</option>
                <option value="6">Bimestral (6)</option>
                <option value="4">Trimestral (4)</option>
                <option value="3">Cuatrimestral (3)</option>
                <option value="2">Semestral (2)</option>
            </select>
        </div>
    </div>

    <h5>Conversor tasa interés nominal a tasa efectiva</h5>
    <div class="row">
        <div class="col-6 col-md-4">
            <label
                title="TNA o TIN (tasa interes nominal vencida). Tasa nominal anual vencida.Anual convertible mensualmente vencida">TNAV
                (%):</label>
            <input type="number" class="form-control form-control-sm" v-model="tna" min="0" max="100" step="0.1">
        </div>
        <div class="col-6 col-md-4">
            <label title="Tasa interés efectiva vencida. TIE. Tasa efectiva anual vencida">TEAV (%):</label>
            <h1>{{ tea }}</h1>
        </div>
    </div>

    <hr>
    <h5>Conversor tasa efectiva a tasa nominal</h5>
    <div class="row">
        <div class="col-6 col-md-4">
            <label>TEAV (%):</label>
            <input type="number" class="form-control form-control-sm" v-model="tea2" min="0" max="100" step="0.1">
        </div>
        <div class="col-6 col-md-4">
            <label>TNAV (%):</label>
            <h1>{{ tna2 }}</h1>
        </div>
    </div>

    <hr>
    <small class="mt-4"><i>TEA = 100 * ((1+ TNA /Qcapitalizacion)^Qcapitalizacion -1)</i></small>
</template>