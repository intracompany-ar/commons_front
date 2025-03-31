import { defineStore } from 'pinia'

export const useStoreAdvices = defineStore('store_advices', () => {

    // Solo tiene la función de ejecutarse => dispara el  storeAdvices.$onAction(({
    function info(content: string = '', titulo: string = '') {  return ; }
    function danger(content: string = '', titulo: string = '') { return ; }
    function warning(content: string = '', titulo: string = '') { return ; }
    function success(content: string = '', titulo: string = '') { return ; }

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