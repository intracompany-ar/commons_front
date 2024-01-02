import { defineStore } from 'pinia'

export const useStoreAdvices = defineStore('store_advices', () => {

    function info(content, titulo = null) {  return; }
    function danger(content, titulo = null) { return; }
    function warning(content, titulo = null) { return; }
    function success(content, titulo = null) { return; }

    /**
     * Medio descolgado, pero lo9 puse acá para que pueda usar notificaciones, desde commons.js no se podía
     * @param {} textoACopiar 
     */
    async function copiar(textoACopiar) {
        const parser = new DOMParser();
        const decodedString = parser.parseFromString(textoACopiar, 'text/html').body.textContent;
    
        try {
            await navigator.clipboard.writeText(decodedString);
            return true;
        } catch (err) {
            return false;
        }
    }
    
    return {copiar, info, danger, success, warning}
})