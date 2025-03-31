import axios from "axios"
import { useStoreAdvices } from './../stores/store_advices'

export function destroy(model: string, id: number, callback?: () => void) {

    if(!confirm('Seguro desea eliminar?')){ return }
    const storeAdvices = useStoreAdvices()

    axios.delete(`${model}/${id}`)
        .then( response => {
            storeAdvices.success("Elemento eliminado");
            if (callback) { callback() }
        })
        .catch( error => {
            console.log(error)
        })

}