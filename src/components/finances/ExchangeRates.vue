<script setup>
import { ref } from 'vue'
import ExchangeRateDetail from './ExchangeRateDetail.vue'

const rowsMayorista = ref([])
const rowsBlue = ref([])
const rowsCcl = ref([])

getRows();
function getRows() {
    // var url = "https://mercados.ambito.com//dolar/oficial/variacion";
    let url = "https://mercados.ambito.com//dolar/mayorista/variacion";

    let urlBlue = 'https://mercados.ambito.com//dolar/informal/variacion';

    let urlCcl = 'https://mercados.ambito.com//dolarrava/cl/variacion';

    // uso fetch, con axios no lo pude hacer funcionar, aparentemente es problema de headers
    fetch(url)
        .then(response => { return response.json() })
        .catch(error => {
            console.log(error)
        })
        .then(data => { rowsMayorista.value = data ?? null; })

    fetch(urlBlue)
        .then(response => { return response.json() })
        .catch(error => {
            console.log(error)
        })
        .then(data => { rowsBlue.value = data ?? null; })

    fetch(urlCcl)
        .then(response => { return response.json() })
        .catch(error => {
            console.log(error)
        })
        .then(data => { rowsCcl.value = data ?? null; })
}
</script>

<template>
    <div class="row mx-0 p-1">
        <div class="col-6 col-md-12">
            <ExchangeRateDetail v-if="rowsMayorista" :data="rowsMayorista">U$S Mayorista</ExchangeRateDetail>
        </div>
        <div class="col-6 col-md-12">
            <ExchangeRateDetail v-if="rowsBlue" :data="rowsBlue">U$S Libre</ExchangeRateDetail>
        </div>
        <div class="col-6 col-md-12">
            <ExchangeRateDetail v-if="rowsCcl" :data="rowsCcl">U$S CCL</ExchangeRateDetail>
        </div>
    </div>
    <!-- DOLARHOY.com pero yo preciso el nacion, no coincide con este -->
    <!-- <div><iframe
                style="width:320px;height:260px;border-radius:10px;box-shadow:2px 4px 4px rgb(0 0 0 / 25%);display:flex;justify-content:center;border:1px solid #bcbcbc"
                src="https://dolarhoy.com/i/cotizaciones/dolar-bancos-y-casas-de-cambio" frameborder="0"></iframe></div> -->
</template>
