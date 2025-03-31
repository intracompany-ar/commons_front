<script setup lang="ts">
import { ref, computed } from 'vue';
import { tnaaToTnav, tnavToTnaa } from  './../../utils/formulas';

const tnav2 = ref(45);
const tnaa = ref(45);
const days = ref(360)
const daysPerYear = ref(360)

const tnav = computed(() => { 
    let tasa = tnaa.value / 100;
    return tnaaToTnav(tasa, days.value, daysPerYear.value) * 100;
});

const tnaa2 = computed(() => { 
    let tasa = tnav2.value / 100;
    return tnavToTnaa(tasa, days.value, daysPerYear.value) * 100;
});
</script>

<template>
    <div class="bg-secondary bg-opacity-25 p-2 border">

        <h5>ADELANTADA -> VENCIDA</h5>
        <div class="row">
            <div class="col-6 col-md-4">
                <label title="tasa nominal anual anticipada">TNA adelantada [%]</label>
                <input type="number" class="form-control form-control-sm" v-model="tnaa" min="0" max="100" step="0.1">
            </div>
            <div class="col-6 col-md-4">
                <label title="Tasa Nominal interés vencida">TNA vencida [%]</label>
                <h1>{{ Math.round(tnav*100)/100 }}</h1>
            </div>
        </div>
    
        <hr>
    
        <h5>VENCIDA -> ADELANTADA</h5>
        <div class="row">
            <div class="col-6 col-md-4">
                <label title="tasa nominal anual anticipada">TNA vencida [%]</label>
                <input type="number" class="form-control form-control-sm" v-model="tnav2" min="0" max="100"
                    step="0.1">
            </div>
            <div class="col-6 col-md-4">
                <label title="Tasa Nominal interés vencida">TNA adelantada [%]</label>
                <h1>{{ Math.round(tnaa2 *100)/100 }}</h1>
            </div>
        </div>
    
        <br>
        <h4>Ajuste por fracción de año</h4>
        <div class="row">
            <div class="col-6 col-md-3">
                <label title="tasa nominal anual anticipada">Fración [días]</label>
                <input type="number" class="form-control form-control-sm" v-model="days" min="0" max="100" step="1" required>
            </div>
            <div class="col-6 col-md-3">
                <label title="tasa nominal anual anticipada">Días por año</label>
                <select class="form-control form-control-sm"   v-model="daysPerYear">
                    <option value="360">360</option>
                    <option value="365">365</option>
                </select>
            </div>
        </div>
        
        <hr>

        <i>
            TNAA: Tasa Nominal Anual Adelantada
            <br>
            TNAV: Tasa Nominal Anual Vencida
            <br>
            <a href="https://www.rankia.cl/blog/analisis-ipsa/3516362-conversiones-tasas-vencidas-anticipadas" target="_blank"
                rel="noreferrer noopener">
                <small>Más info click aquí. Iv= Ia/(1-Ia)</small>
            </a>
        </i>
    </div>

</template>

<style>
    input[required], textarea[required] {
        background-color: rgb(255,255,255);
    }
</style>