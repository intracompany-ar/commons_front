<script setup lang="ts">
import { ref, onMounted } from 'vue'
import '@selectize/selectize'

const model = defineModel()

const tags = ref([]);
onMounted(() => {
    axios('tag/select')
        .then(response => {
            tags.value = response.data;
            $('#selectizeTags').selectize({
                plugins: ['restore_on_backspace', 'remove_button'],
                delimiter: ',',
                persist: false,
                valueField: 'id',
                labelField: 'name',
                searchField: ['name'],
                options: tags.value,
                items: (typeof  model.value === 'string' )? model.value :  (model.value ? model.value.map(item => item.id) : []),
                create(input) {
                    return {
                        value: input,
                        text: input
                    }
                },
                onChange: function(value) { model.value = value; }
            });
        })
})
</script>


<template>
    <label class="form-label" for="tags">Tags</label>
    <!-- <a :href="view.tags')"><i class="fas fa-tags"></i></a> -->
    <input type="text" id="selectizeTags" name="tags">
</template>