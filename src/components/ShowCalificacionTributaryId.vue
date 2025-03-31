<script setup lang="ts">
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('es');
dayjs.extend( relativeTime );
defineProps({ tributaryIdSituacionRespuesta: { required: true, type: [Array, Object] } });
</script>

<template>
    <h5>
        <slot></slot>
    </h5>
    <div v-if="tributaryIdSituacionRespuesta">
        <button type="button" class="btn btn-lg" :class="{
            'btn-danger': tributaryIdSituacionRespuesta.dictamen == 'N',
            'btn-warning': tributaryIdSituacionRespuesta.dictamen == 'R',
            'btn-success': tributaryIdSituacionRespuesta.dictamen == 'A'
        }">
            {{ tributaryIdSituacionRespuesta.dictamen_texto }}
            <span class="badge bg-secondary">
                <small>Scr</small>
                {{ tributaryIdSituacionRespuesta.score_nosis }}</span>
        </button>
        <br>
        <span class="text-muted">Fecha del Score:</span> {{ tributaryIdSituacionRespuesta.fecha }}
        <br>
        <span class="text-muted">Límite crédito:</span> $ {{ tributaryIdSituacionRespuesta.limite_credito ?
            tributaryIdSituacionRespuesta.limite_credito.limite_credito : '' }}
        <br>
        <span class="text-muted">Observación:</span> {{ tributaryIdSituacionRespuesta.observation }}
        <br>
        <small>
            <span class="text-muted">Calificó:</span>
            {{ tributaryIdSituacionRespuesta.created_by ? tributaryIdSituacionRespuesta.created_by.name : '' }}
            {{ dayjs(tributaryIdSituacionRespuesta.created_at).fromNow() }}
            <br>
        </small>
    </div>
</template>