<script setup>
import { ref, computed, reactive } from 'vue'

const caso = ref('1');

// Contrubición Marginal Unitaria
const cmu = reactive({
    porc0: 0,
    cash0: 0,
    cash1: 0,
})
// Precio
const price = reactive({
    porc: 0,
    cash: 0,
})
// Costo Variable Unitario
const cvu = reactive({
    porc: 0,
    cash: 0,
})

const cf = reactive({
    cash: 0,
})

const quantiy0 = ref(0);

const termBase = computed(() => {
    return -parseFloat(price.porc)
        /
        (parseFloat(cmu.porc0) + parseFloat(price.porc));
})

const termCV = computed(() => {
    return -(parseFloat(price.cash) - parseFloat(cvu.cash))
        /
        (parseFloat(cmu.cash0) + parseFloat(price.cash) - parseFloat(cvu.cash))
})

const termCF = computed(() => {
    return parseFloat(cf.cash)
        /
        (parseFloat(cmu.cash1) * parseFloat(quantiy0.value));
})

const mvePorc = computed(() => {
    var toRet = 0;
    switch (caso.value) {
        case '1': toRet = termBase.value; break;
        case '2': toRet = termCV.value; break;
        case '3': toRet = termBase.value + termCF.value; break;
        case '4': toRet = termCV.value + termCF.value; break;
    };
    // console.log(toRet);
    return isNaN(toRet) ? 0 : Math.round(toRet * 10000) / 100;
})
</script>


<template>
    <div class="container mt-4 bg-secondary bg-opacity-25 border rounded p-4">
        <h3>Modificación de Ventas de Equilibrio (MVE)</h3>

        <div class="row">
            <div class="col-12">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="type" id="case_1" value="1" v-model="caso">
                    <label class="form-check-label" for="case_1">Cambia Precio</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="type" id="case_2" value="2" v-model="caso">
                    <label class="form-check-label" for="case_2">Cambia Precio y Costo Variable</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="type" id="case_3" value="3" v-model="caso">
                    <label class="form-check-label" for="case_3">Cambia Precio y Costo Fijo</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="type" id="case_4" value="4" v-model="caso">
                    <label class="form-check-label" for="case_4">Cambia Precio y Costo Variable y Costo Fijo</label>
                </div>
            </div>
        </div>

        <hr>

        <div class="row">

            <div class="col-md-3 col-6" v-if="['1', '3'].includes(caso)">
                <label for="">Variación de precio</label>
                <div class="input-group">
                    <div class="input-group-text">
                        <span class="input-group-addon">%</span>
                    </div>
                    <input type="number" class="form-control" min="-300" max="300" step="0.01" v-model="price.porc">
                </div>
            </div>

            <div class="col-md-3 col-6" v-if="['1', '3'].includes(caso)">
                <label for="">CMU Actual</label>
                <div class="input-group">
                    <div class="input-group-text">
                        <span class="input-group-addon">%</span>
                    </div>
                    <input type="number" class="form-control" min="-300" max="300" step="0.01" v-model="cmu.porc0">
                    <div class="form-text">Contribución Marginal Unitaria Actual [% respecto al precio actual]</div>
                </div>
            </div>




            <div class="col-md-3 col-6" v-if="['2', '4'].includes(caso)">
                <label for="">Var. Precio</label>
                <div class="input-group">
                    <div class="input-group-text">
                        <span class="input-group-addon">$</span>
                    </div>
                    <input type="number" class="form-control" min="-999999999" max="999999999" step="0.01"
                        v-model="price.cash">
                </div>
                <div class="form-text">Variación del precio</div>
            </div>

            <div class="col-md-3 col-6" v-if="['2', '4'].includes(caso)">
                <label for="">Var. CV</label>
                <div class="input-group">
                    <div class="input-group-text">
                        <span class="input-group-addon">$</span>
                    </div>
                    <input type="number" class="form-control" min="-999999999" max="999999999" step="0.01"
                        v-model="cvu.cash">
                </div>
                <div class="form-text">Variación del Costo Variable</div>
            </div>

            <div class="col-md-3 col-6" v-if="['2', '4'].includes(caso)">
                <label for="">CMU Actual</label>
                <div class="input-group">
                    <div class="input-group-text">
                        <span class="input-group-addon">$</span>
                    </div>
                    <input type="number" class="form-control" min="-999999999" max="999999999" step="0.01"
                        v-model="cmu.cash0">
                </div>
                <div class="form-text">Contribución Marginal Unitaria Actual</div>
            </div>

            <div class="col-md-3 col-6" v-if="['3', '4'].includes(caso)">
                <label for="">Variación de CF</label>
                <div class="input-group">
                    <div class="input-group-text">
                        <span class="input-group-addon">$</span>
                    </div>
                    <input type="number" class="form-control" min="-999999999" max="999999999" step="0.01"
                        v-model="cf.cash">
                </div>
                <div class="form-text">Variación de Costos Fijos</div>
            </div>

            <div class="col-md-3 col-6" v-if="['3', '4'].includes(caso)">
                <label for="">Nueva CMU</label>
                <div class="input-group">
                    <div class="input-group-text">
                        <span class="input-group-addon">$</span>
                    </div>
                    <input type="number" class="form-control" min="-999999999" max="999999999" step="0.01"
                        v-model="cmu.cash1">
                </div>
                <div class="form-text">Contribución Marginal Unitaria luego de aplicar la variación de CF </div>
            </div>

            <div class="col-md-3 col-6" v-if="['3', '4'].includes(caso)">
                <label for="">Ventas Actuales</label>
                <div class="input-group">
                    <div class="input-group-text">
                        <span class="input-group-addon">Unid.</span>
                    </div>
                    <input type="number" class="form-control" min="-999999999" max="999999999" step="0.01"
                        v-model="quantiy0">
                </div>
            </div>
        </div>


        <div class="row mt-4">

            <div class="offset-4 col-4 my-2">
                <h2 class="border border-3 rounded">MVE: {{ mvePorc }}%</h2>
            </div>

            <b class="mt-4">Interpretación</b>
            <div class="col-12">
                <ul v-if="mvePorc < 0">
                    <li>El máximo % que puede dejar de vender para que el aumento de precio sea conveniente.</li>
                    <li>Si sus ventas caen menos de este porcentaje la decisión es acertada.</li>
                </ul>
                <ul v-if="mvePorc > 0">
                    <li>El mínimo % que deberá incrementar sus ventas para que la reducción de precio sea conveniente.</li>
                    <li>El % que deberá incrementar sus ventas para mantener el equilibrio.</li>
                    <li>Si sus suben menos de este porcentaje la decisión es errónea.</li>
                </ul>
            </div>

        </div>
    </div>
</template>