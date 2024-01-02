<script setup>
    import { ref} from 'vue'

    const required = ref(false);
    const type = ref('text');
    const min = ref(0);
    const max = ref(9999999);

    const props = defineProps({
        value: {
            required: false,
            type: [String, Number],
            default: ''
        },
        params: {
            required: true,
            type: String,
        },
        name: {
            required: true,
            type: String,
        },
        small: {
            required: false,
            type: Boolean,
            default: true
        },
        divclass:{
            required: false,
            type: String,
            default: 'col-6 col-md-3'
        }
    });

    let arrParams = props.params.split('|');
    arrParams.forEach(param => {
        let paramDots = param.split(':');
        if (paramDots[1]) {
            switch (paramDots[0]) {
                case 'min':
                    min.value = paramDots[1];
                    break;
                case 'max':
                    max.value = paramDots[1];
                    break;
            };
        }else{
            switch (param) {
                case 'required':
                    required.value = true; break;
                case 'string':
                    type.value = 'text'; break;
                case 'numeric':
                case 'integer':
                    type.value = 'number'; break;
                case 'date':
                    type.value = 'date'; break;
                case 'datetime':
                    type.value = 'datetime'; break;
            }
        };
    });
</script>

<template>
    <div v-bind:class="props.divclass">
        <label v-bind:for="props.name"><slot></slot></label>
        <input  v-bind:type="type" 
                v-bind:maxlength="max" 
                v-bind:max="max" 
                v-bind:min="min"
                class="form-control" 
                v-bind:class="{'form-control-sm': props.small}" 
                v-bind:name="props.name" 
                v-bind:value="props.value" 
                v-bind:required="props.required">
    </div>
</template>