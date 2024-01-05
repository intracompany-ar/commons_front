<script setup>
import {ref, computed} from 'vue'
import { tnaToTea, tnavToTnaa } from './../../utils/formulas';

const DIAS_POR_ANIO = 12;

const capitalizacion = ref(DIAS_POR_ANIO);
// Tasas implicita en pronto pago
const descProntoPago = ref(12);
const tiempoAdelantaPago = ref(2);
const tna = ref(52.17);

const tnavDescPronto = computed(() => 
{
    let tasaRecarg = 1 / (1 - descProntoPago.value / 100)- 1; // Precio final: 1 / Precio Inicial: 0,8 (ejemplo -20% desc pronto pago)

    let tasaDiaria = tasaRecarg / tiempoAdelantaPago.value;

    let tasaAnualizada = tasaDiaria * capitalizacion.value;
    return Math.round( tasaAnualizada * 10000) / 100;
});

const teaDescPronto = computed(() => { return tnaToTea(tnavDescPronto.value, capitalizacion.value); });
const tnaaDescPronto = computed(() => { return Math.round(tnavToTnaa(tnavDescPronto.value) * 10000 ) /100; });
</script>

<template>
    <h5>Tasa implícita en descuento pronto pago</h5>
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


    <div class="row">
        <div class="col-4 col-md-4">
            <label>
                <span v-if="['360', '365'].includes(capitalizacion)">Días </span>
                <span v-if="['52'].includes(capitalizacion)">Semanas </span>
                <span v-if="['12'].includes(capitalizacion)">Meses </span>
                <span v-if="['6'].includes(capitalizacion)">Bimestres </span>
                <span v-if="['4'].includes(capitalizacion)">Trimestres </span>
                <span v-if="['3'].includes(capitalizacion)">Cuatrimestres </span>
                <span v-if="['2'].includes(capitalizacion)">Semestres </span>
                
                de anticipo del pago:</label>
            <input type="number" class="form-control form-control-sm" v-model="tiempoAdelantaPago" min="0" max="1000">
        </div>
        <div class="col-4 col-md-4">
            <label title="60 dias promedio">Desc. por el pago anticipado:</label>
            <input type="number" class="form-control form-control-sm" v-model="descProntoPago" min="-100" max="0"
                step="0.1">
        </div>
        <div class="col-4 col-md-4">
            <label>TNAV (%):</label> 
            <h3>{{ tnavDescPronto }}</h3>
            <label>TNAA (%):</label> 
            <h3>{{ tnaaDescPronto }}</h3>
            <label>TEA (%):</label> 
            <h3>{{ teaDescPronto }}</h3>
        </div>
    </div>

    <br>
    <a href="https://perebrachfield.com/blog/noticias-e-informaciones/como-hacer-la-conversion-en-tipo-anual-equivalente-del-descuento-por-pronto-pago/"
        target="_blank" rel="noreferrer noopener"><small title="En el link lo razona distinto">Más info click aquí. TNAV
            = [ 1/ (1-descCdo) -1 ] * (360/ 60)</small></a>
    <small>descProntoPago = [1 + 360/diasAntes * (1-Ia)/Ia ]^-1</small>
</template>