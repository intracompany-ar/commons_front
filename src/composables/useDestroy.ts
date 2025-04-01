import axios from "axios"
import { showAdvice } from './../utils/advicesBus'

export function destroy(model: string, id: number, callback?: () => void) {

    if(!confirm('Seguro desea eliminar?')){ return }
    
    axios.delete(`${model}/${id}`)
        .then( response => {
            showAdvice('success', 'Elemento eliminado')
            if (callback) { callback() }
        })
        .catch( error => {
            console.log(error)
        })

}