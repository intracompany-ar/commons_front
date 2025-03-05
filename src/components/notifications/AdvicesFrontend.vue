<script setup>
import { ref, onMounted } from 'vue'
import { useStoreAdvices } from './../../stores/store_advices';

const WITH_AUDIO = false;
const optionToast = ref({ animation: true });
const avisosDOM = ref([]);

ocultarAvisoBackEnd();

// LIVEWIRE (usa avisos backend como si fueran frontends)
document.addEventListener("DOMContentLoaded", () => {
    if (typeof Livewire !== 'undefined') {
        Livewire.hook('message.processed', (message, component) => {
            ocultarAvisoBackEnd();
        })
    }
});

function ocultarAvisoBackEnd() {
    $(".alert-temporal").fadeTo(10000, 10000).slideUp(500, function () {
        $(".alert-temporal").slideUp(500);
    });
}

let storeAdvices = null;

onMounted(() => {
    storeAdvices = useStoreAdvices();
    storeAdvices.$onAction(({
        name, // name of the action
        store, // store instance, same as `someStore`
        args, // array of parameters passed to the action
        after, // hook after the action returns or resolves
        onError, // hook if the action throws or rejects
    }) => {
        // console.log(callback)
        switch(name)
        {
            case 'copiar':
                notificar('Info', 'Texto copiado al portapapeles. Utilícelo con Ctrl+V o Pegar');
                break;
            case 'success':
                notificar('Success', args[0], args[1]); 
                break;
            case 'info':
                notificar('Info', args[0], args[1]); 
                break;
            case 'danger':
                notificar('Danger', args[0], args[1]); 
                break;
            case 'warning':
                notificar('Warning', args[0], args[1]); 
                break;
            default:
                notificar('Danger', 'Falló la operación.');
        };
    })
})

function notificar(tipo, content, titulo = null) {
    if (Array.isArray(content)) {
        // TODO ver como hago un <ul><li></li></ul>
        console.warn('Falta implementar la lógica para contenido de tipo array');
        // return;
    };

    console.log(tipo, content)

    let id = tipo + Math.round(Math.random() * 10000000);

    titulo = titulo ?? tipo;

    // Mapeo de tipos a nombres más amigables
    const tipoMap = {
        'Info': 'Información',
        'Danger': 'Error',
        'Warning': 'Precaución',
        'Success': 'Éxito',
    };

    titulo = tipoMap[titulo] || titulo;

    avisosDOM.value.push({ tipo, titulo, content, id });

    setTimeout(() => { // Le tengo que dar tiempo a vue js que renderize el DOM
        let toastElement = document.getElementById(id);
        if (!toastElement) {
            console.error('No existe el elemento con id', id);
            return;
        }
        storeAdvices.showing = true;
        toastElement.style.display = 'block'; // Muestra el toast estableciendo el estilo display a 'block'

        // Opcional: Personaliza otros estilos según tus necesidades
        // toastElement.style.position = 'fixed';
        // toastElement.style.bottom = '20px';
        // toastElement.style.left = '50%';
        // toastElement.style.transform = 'translateX(-50%)';

        // Cierra el toast después de cierto tiempo (ajusta según tus necesidades)
        setTimeout(() => {
            // Cuando se cierre el toast lo elimino del avisosDOM
            avisosDOM.value.shift();
            toastElement.style.display = 'none';
            storeAdvices.showing = false;
        }, optionToast.value.duration ?? 3000); // Duración predeterminada: 3000 ms (3 segundos)

        if (WITH_AUDIO) {
            let idTrackToPlay = tipo == 'Danger' || tipo == 'Warning' ? 'notiferror' : 'notifcoldday';
            document.getElementById(idTrackToPlay).play();
        };

    }, 500);
}

function cerrarToast(idParam){
    let el = document.getElementById(idParam)
    if (el) { el.style.display = 'none'; }
};
</script>


<template>
    
    <!-- Toaster (avisos frontend Bootstrap). Modal es z-index: 1060 => a este pongo 1070 -->
    <div class="toast-container position-fixed top-0 end-0 p-3" id="toastContainer" style="z-index: 1070; margin-top: 70px">
        <div v-for="aviso in avisosDOM" class="toast align-items-center"
            v-bind:class="{   'text-white bg-primary': aviso.tipo == 'Info',
                        'text-white bg-danger': aviso.tipo == 'Danger',
                        'text-white bg-success': aviso.tipo == 'Success',
                        'bg-warning': aviso.tipo == 'Warning'
                    }"
            role="alert" aria-live="assertive" aria-atomic="true" 
            v-bind:id="aviso.id">
            <div class="toast-header">
                <strong class="me-auto">
                    <i class="fas fa-info-circle" v-if="aviso.tipo == 'Info'"></i>
                    <i class="fas fa-exclamation-circle" v-if="aviso.tipo == 'Danger'"></i>
                    <i class="fas fa-exclamation-triangle" v-if="aviso.tipo == 'Warning'"></i>
                    <i class="far fa-check-circle" v-if="aviso.tipo == 'Success'"></i>

                    {{ aviso.titulo }}
                </strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" @click="cerrarToast(aviso.id)"></button>
            </div>
            <div class="toast-body">{{ aviso.content }}</div>
        </div>
    </div>
</template>