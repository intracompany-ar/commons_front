<script setup>
    import {ref, watch} from 'vue'

    const emit = defineEmits(['calculated']);

    const document = ref('');
    const tipoEntidad = ref('20');

    watch(document, async() =>  {
        calculate()
    })
    watch(tipoEntidad, async() =>  {
        calculate()
    })


    function calculate()
    {
        let tipoEntidadArr = tipoEntidad.value.split('');
        let documentArr = document.value.toString().split('');
        let digitos = tipoEntidadArr.concat(documentArr);

        let multiplicadores = [5,4,3,2,7,6,5,4,3,2];
        let suma = 0;

        digitos.forEach( (digito, key) => {
            suma += parseInt(digito) * multiplicadores[key];
        });

        let resto = suma % 11;
        let xyInicial   = tipoEntidad.value;
        let verificador = '';

        if( 11-resto == 10 ){// Implica que el verificador es 10, y solo pueden tener 1 digito => se cambia el xy incial
            if( tipoEntidad.value == '30' )
            {
                xyInicial = 33;
            }else{
                xyInicial = 23;
            };

            switch (tipoEntidad.value) {
                case '20':
                case '30':
                    verificador = 9;
                    break;
                case '27':
                    verificador = 4;
                    break;
                default:
                    verificador = 11-resto;
                    break;
            }

        }else if( 11-resto == 11){
            xyInicial = tipoEntidad.value;
            verificador =  0;
        }else{
            xyInicial = tipoEntidad.value;
            verificador =  11-resto;
        };


        let entity_id = xyInicial+document.value+verificador;
        emit('calculated', entity_id);
    }
</script>




<template>
    <div class="row">
        <div class="col-12">
            <div class="btn-group btn-group-sm mb-2" role="group" aria-label="Basic example">
                <input type="radio" class="btn-check" value="20" name="tipo_entidad" id="tipoEnteH" autocomplete="off" v-model="tipoEntidad" checked>
                <label class="btn btn-outline-danger" for="tipoEnteH">Hombre</label>

                <input type="radio" class="btn-check" value="27" name="tipo_entidad" id="tipoEnteM" autocomplete="off" v-model="tipoEntidad">
                <label class="btn btn-outline-danger" for="tipoEnteM">Mujer</label>

                <input type="radio" class="btn-check" value="30" name="tipo_entidad" id="tipoEnteS" autocomplete="off" v-model="tipoEntidad">
                <label class="btn btn-outline-danger" for="tipoEnteS">Sociedad</label>

                <!-- <input type="radio" class="btn-check" value="24" name="tipo_entidad" id="tipoEntePR" autocomplete="off" v-model="tipoEntidad" disabled>
                <label class="btn btn-outline-danger" for="tipoEntePR">Pers. Repetida <small>(empieza con 24)</small></label> -->

                <!-- <input type="radio" class="btn-check" value="34" name="tipo_entidad" id="tipoEnteER" autocomplete="off" v-model="tipoEntidad">
                <label class="btn btn-outline-danger" for="tipoEnteER">Empresa Repetida <small>(empieza con 34)</small></label> -->
            </div>
        </div>

            
        <div class="row">
            <div class="col-6">
                <label for="document">Documento Único (DU/DNI):</label>
                <input type="number" min="0" max="99999999" maxlength="8" class="form-control" placeholder="Documento" v-model="document" id="document">
            </div>
        </div>
    </div>
</template>