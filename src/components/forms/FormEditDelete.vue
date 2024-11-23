<script setup>
import { ref, onMounted } from 'vue';
import { useStoreAdvices } from '../../stores/store_advices';
import Method from './inputs/Method.vue';
const storeAdvices = useStoreAdvices()
const emit = defineEmits(['deleted']);

const props = defineProps({
    urldelete: { required: false, type: String, default: null },
    urledit: { required: false, default: '', type: String },
    frase: { required: false, default: '¿Seguro desea eliminar el elemento?', type: String },
    id: { required: false, default: 'form_del_edit', type: String },
    idToReplace: { required: false, default() { return [] }, type: Array },
    modeText: { required: false, default: false, type: Boolean },
    labelEdit: { required: false, default: 'Editar', type: String },
    labelDelete: { required: false, default: 'Eliminar', type: String }
});

const urlDeleteReplaced = ref('');
const urledit2 = ref('');
const isAsync = ref(false);

onMounted(() => {

    isAsync.value = props.idToReplace.length > 0;

    if (isAsync.value) {
        urlDeleteReplaced.value = props.urldelete
            ? props.urldelete
                .replace(':' + props.idToReplace[0], props.idToReplace[1])
                .replace('%3A' + props.idToReplace[0], props.idToReplace[1])
            : '';
        urledit2.value = props.urledit
            ? props.urledit.replace(':' + props.idToReplace[0], props.idToReplace[1])
                .replace('%3A' + props.idToReplace[0], props.idToReplace[1])
            : '';
    } else {
        urlDeleteReplaced.value = props.urldelete;
        urledit2.value = props.urledit;
    }
})

function submitForm() {
    if (confirm(props.frase)) {
        if (isAsync.value) {
            axios.delete(urlDeleteReplaced.value)
                .then(response => {
                    storeAdvices.success('Eliminada');
                    emit('deleted');
                });
        } else {
            document.getElementById(props.id).submit();
        };
    };
}
</script>


<template>
    <span>
        <form v-bind:action="urlDeleteReplaced" method="post" v-bind:id="props.id">

            <div v-if="!isAsync">
                <Method method="DELETE" />
            </div>

            <a v-if="props.urledit" v-bind:href="urledit2">
                <i class="fas fa-edit"></i>
                <span v-if="props.modeText">{{ props.labelEdit }}</span>
            </a>

            <br v-if="props.modeText">

            <a v-if="props.urldelete" href="#" v-on:click.prevent="submitForm">
                <i class="fas fa-trash-alt"></i>
                <span v-if="props.modeText">{{ props.labelDelete }}</span>
            </a>

        </form>
        <!-- <FormEditDelete urldelete="{ route('tipo_cliente.destroy', $value->id) }" urledit="{ route('tipo_cliente.edit', $value->id) }" frase="Seguro quiere eliminar este tipo de cliente?"/> -->
    </span>
</template>