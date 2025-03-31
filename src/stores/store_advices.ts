import { defineStore } from 'pinia'

export const useStoreAdvices = defineStore('store_advices', () => {

    function info(content: string, titulo = null) {  return content; }
    function danger(content: string, titulo = null) { return content; }
    function warning(content: string, titulo = null) { return content; }
    function success(content: string, titulo = null) { return content; }

    /**
     * Medio descolgado, pero lo9 puse acá para que pueda usar notificaciones, desde commons.js no se podía
     * @param {} textoACopiar 
     */
    async function copiar(textoACopiar: string) {
        const parser = new DOMParser();
        const decodedString = parser.parseFromString(textoACopiar, 'text/html').body.textContent;
    
        if(!decodedString) {
            return false;
        }
        try {
            await navigator.clipboard.writeText(decodedString);
            return true;
        } catch (err) {
            return false;
        }
    }
    
    return {copiar, info, danger, success, warning}
})