<script setup>
import { ref, computed } from 'vue';
import { tnaaToTnav, tnavToTnaa } from  './../../utils/formulas';

const tnav2 = ref(45);
const tnaa = ref(45);

const tnav = computed(() => { 
    let tasa = tnaa.value / 100;
    return tnaaToTnav(tasa) * 100;
});

const tnaa2 = computed(() => { 
    let tasa = tnav2.value / 100;
    return tnavToTnaa(tasa) * 100;
});
</script>

<template>
    <h5>Tasa interés anticipada a tasa vencida</h5>
    <div class="row">
        <div class="col-6 col-md-4">
            <label title="tasa nominal anual anticipada">TNA adelantada [%]:</label>
            <input type="number" class="form-control form-control-sm" v-model="tnaa" min="0" max="100"
                step="0.1">
        </div>
        <div class="col-6 col-md-4">
            <label title="Tasa Nominal interés vencida">TNA vencida [%]:</label>
            <h1>{{ Math.round(tnav*100)/100 }}</h1>
        </div>
    </div>

    <hr>

    <h5>Tasa interés vencida a tasa a anticipada</h5>
    <div class="row">
        <div class="col-6 col-md-4">
            <label title="tasa nominal anual anticipada">TNA vencida [%]:</label>
            <input type="number" class="form-control form-control-sm" v-model="tnav2" min="0" max="100"
                step="0.1">
        </div>
        <div class="col-6 col-md-4">
            <label title="Tasa Nominal interés vencida">TNA adelantada [%]:</label>
            <h1>{{ Math.round(tnaa2 *100)/100 }}</h1>
        </div>
    </div>

    <br>
    <i>
        <a href="https://www.rankia.cl/blog/analisis-ipsa/3516362-conversiones-tasas-vencidas-anticipadas" target="_blank"
            rel="noreferrer noopener">
            <small>Más info click aquí. Iv= Ia/(1-Ia)</small>
        </a>
    </i>

</template>