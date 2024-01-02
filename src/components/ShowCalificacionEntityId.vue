<script setup>
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('es');
dayjs.extend(relativeTime);
defineProps({ entitySituacionRespuesta: { required: true, type: [Array, Object] } });
</script>

<template>
    <h5>
        <slot></slot>
    </h5>
    <div v-if="entitySituacionRespuesta">
        <button type="button" class="btn btn-lg" :class="{
            'btn-danger': entitySituacionRespuesta.dictamen == 'N',
            'btn-warning': entitySituacionRespuesta.dictamen == 'R',
            'btn-success': entitySituacionRespuesta.dictamen == 'A'
        }">
            {{ entitySituacionRespuesta.dictamen_texto }}
            <span class="badge bg-secondary">
                <small>Scr</small>
                {{ entitySituacionRespuesta.score_nosis }}</span>
        </button>
        <br>
        <span class="text-muted">Fecha del Score:</span> {{ entitySituacionRespuesta.fecha }}
        <br>
        <span class="text-muted">Límite crédito:</span> $ {{ entitySituacionRespuesta.limite_credito ?
            entitySituacionRespuesta.limite_credito.limite_credito : '' }}
        <br>
        <span class="text-muted">Observación:</span> {{ entitySituacionRespuesta.observation }}
        <br>
        <small>
            <span class="text-muted">Calificó:</span>
            {{ entitySituacionRespuesta.created_by ? entitySituacionRespuesta.created_by.name : '' }}
            {{ dayjs(entitySituacionRespuesta.created_at).fromNow() }}
            <br>
        </small>
    </div>
</template>