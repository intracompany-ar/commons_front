<script setup>
import { ref, onMounted, watch } from 'vue'

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
    number: { required: false, type: [String, Number], default: 0 },
    modelValue: { required: false },
    valueCheckedIni: { required: false, type: String, default: 'D' },
});

const descRec = ref('');

onMounted(() => { descRec.value = props.valueCheckedIni });

watch(descRec, async () => {
    let sign = descRec.value == 'D' ? -1 : 1;
    emit('update:modelValue', Math.abs(props.modelValue) * sign);
})

function emitir(eventTargetValue) {
    let sign = descRec.value == 'D' ? -1 : 1;
    emit('update:modelValue', Math.abs(eventTargetValue) * sign);
}
</script>


<template>
    <div class="row mt-2">
        <div class="col-6">
            <div class="input-group">
                <input type="number" step="0.0001" class="form-control border-end-0  border border-2 border-primary" placeholder=" "
                    v-bind:id="'descuentoRecargo' + props.number"
                    v-bind:value="props.modelValue == 0 ? '' : props.modelValue" v-on:input="emitir($event.target.value)" />
                <div class="input-group-text border border-start-0 border-2 border-primary">
                    <span class="input-group-addon">
                        <slot>%</slot>
                    </span>
                </div>
            </div>
        </div>
        <div class="col-6 text-end">
            <div class="btn-group" role="group" aria-label="Basic example">
                <input type="radio" class="btn-check" v-bind:name="'descrec' + props.number" value="D"
                    v-bind:id="'desc' + props.number" v-model="descRec">
                <label class="btn btn-outline-secondary btn-sm" v-bind:for="'desc' + props.number">Desc.</label>

                <input type="radio" class="btn-check" v-bind:name="'descrec' + props.number" value="R"
                    v-bind:id="'rec' + props.number" v-model="descRec">
                <label class="btn btn-outline-secondary btn-sm pb-2" v-bind:for="'rec' + props.number">Rec.</label>
            </div>
        </div>
    </div>
</template>