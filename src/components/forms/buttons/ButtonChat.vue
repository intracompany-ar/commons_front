<script setup> const props = defineProps(['cantOnline']); </script>

<template>
    <button type="button" class="btn btn-sm btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true"         aria-expanded="false" style="vertical-align: middle;"><i class="far fa-comments"></i>
        En línea ({{ props.cantOnline }})
    </button>
</template>