<script setup>
import { ref, computed, inject } from 'vue'
import { useStoreAdvices } from './../../stores/store_advices'
const storeAdvices = useStoreAdvices()
const emit = defineEmits(['getRows', 'itemSelected', 'toAdd']);

const props = defineProps({
    item: { type: Object },
    fatherField: { type: String }
})

const urlEdit = inject('urlEdit', null)
const urlDestroy = inject('urlDestroy', null)
const urlGetChildren = inject('urlGetChildren', null)
const urlStore = inject('urlStore', null)

const isOpen = ref(false)
const modeEdit = ref(0)
const modeAddChild = ref(0)

const isFolder = computed(() => {
    return props.item ?
        [1, '1'].includes(props.item.is_title)
        || hasChildren()
        : false
})

function toggle() {
    if (!isFolder.value) { return }
    if (!isOpen.value) { getChildren() }
    isOpen.value = isOpen.value ? !isOpen.value : isOpen.value
}

function getChildren() {
    if (!urlGetChildren) { return }

    let url = urlGetChildren.replace(':fatherId', props.item.id)
        .replace('%3AfatherId', props.item.id);

    axios(url)
        .then(response => {
            props.item.children = response.data;
        })
        .then(() => isOpen.value = true)
}

function update(itemParam) {
    let formData = {};
    formData['name'] = document.querySelector('#input_edit_tree_' + itemParam.id).value;

    if (props.fatherField != '') {
        formData[props.fatherField] = itemParam[props.fatherField];
    }

    formData['id'] = props.item.id;

    let url = urlEdit;
    url = url.replace(':id', props.item.id)
        .replace('%3Aid', props.item.id);
    axios.put(url, formData)
        .then(response => {
            storeAdvices.success('Actualizado')
            emit('getRows');
            modeEdit.value = 0;
        })
}

function destroy(itemId) {
    if (confirm('Seguro desea eliminar este elemento?')) {
        let url = props.urlDestroy;
        url = url.replace(':id', itemId)
            .replace('%3Aid', itemId);
        axios.delete(url)
            .then(response => {
                storeAdvices.success('Eliminado');
                emit('getRows');
            })
    }
}

function storeChild(itemId) {
    let formData = {};
    formData['name'] = document.querySelector('#name_child_' + itemId).value;

    if (props.fatherField != '') { formData[props.fatherField] = itemId }

    axios.post(urlStore, formData)
        .then(() => {
            emit('getRows');
            modeAddChild.value = 0;
        });
}

function hasChildren() { return props.item.children ? props.item.children.length > 0 : false }
</script>

<style>
.tree-item {
    cursor: pointer;
}
</style>

<!-- NO USAR Emit desde aca porque como son anidados de anidados, no se propagan a los abuelos, vi en google que e puede hacer con this.$parent.$emit, pero tampoco sé la profundidad delsubcomponente, otra es this.$root.$emit y usar listener $on del root, pero está deprected en Vue3 -->
<template>
    <li style="list-style-type: none">
        <div class="row" :style="isFolder ? 'font-weight: bold' : ''">
            <div class="col-8">
                <span v-if="isFolder && hasChildren()" v-on:click="toggle(props.item.id)">
                    <span v-show="isOpen"> <i class="far fa-minus-square"></i></span>
                    <span v-show="!isOpen"><i class="fas fa-plus-square"></i></span>
                </span>
                <span v-else> &nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span v-if="props.item" v-on:click="emit('itemSelected', {
                    id: props.item.id,
                    code: props.item.code,
                    name: props.item.name
                })">

                    <!-- {{ props.item }} -->
                    <span v-if="modeEdit == props.item.id">
                        <!-- estoy aca -->
                        <div class="input-group">
                            <input type="text" class="form-control form-control-sm" :value="props.item.name"
                                :id="'input_edit_tree_' + props.item.id">

                            <a href="#" class="btn btn-secondary" v-on:click.prevent="update(props.item)">
                                <i class="fas fa-save"></i>
                            </a>
                            <a href="#" v-on:click.prevent="modeEdit = 0" class="btn btn-primary btn-sm">
                                <i class="fas fa-times"></i>
                            </a>
                        </div>
                    </span>
                    <span v-else>
                        {{ props.item.name }} <small class="text-muted">#{{ props.item.id }}</small>
                    </span>

                </span>

            </div>

            <div class="col-4">
                <a class="my-1" href="#" v-on:click.prevent="modeEdit = props.item.id" v-if="urlEdit">
                    <i class="fas fa-edit"></i>
                </a>
                <a class="my-1" href="#" v-on:click.prevent="destroy(props.item.id)" v-if="urlDestroy">
                    <i class="fas fa-trash-alt"></i>
                </a>
                <a class="my-1" href="#" v-on:click.prevent="modeAddChild = props.item.id" v-if="fatherField != ''">
                    Agregar hijo
                </a>
            </div>

            <div class="col-md-8 col-12" v-if="modeAddChild == props.item.id && urlStore">
                <div class="input-group input-group-sm">
                    <input class="form-control form-control-sm" type="text" :id="'name_child_' + item.id" />

                    <a href="#" v-on:click.prevent="storeChild(props.item.id)" class="btn btn-secondary">
                        <i class="fas fa-save"></i>
                    </a>

                    <a href="#" v-on:click.prevent="modeAddChild = 0" class="btn btn-primary btn-sm">
                        <i class="fas fa-times"></i>
                    </a>
                </div>
            </div>
        </div>

        <ul v-show="isOpen" v-if="isFolder" class="m-0"
            style="list-style-type:none; padding-left: 1em; line-height: 1.5em; list-style-type: dot;">

            <TreeItem class="tree-item" v-for="child in item.children" :key="child.id" :item="child"
                :father-field="fatherField" v-on:item-selected="emit('itemSelected', { 'id': $event.id })"
                v-on:to-add="emit('toAdd', child)" />
        </ul>
    </li>
</template>