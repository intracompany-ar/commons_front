// CommonsFron v1 Copyright (c) 2023 Alejandro5577
const REG_EXP_MAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const REG_EXP_DIFFERENT_OF_NUMBER = /[^0-9]/g;

export function isEmail(text) {
    return REG_EXP_MAIL.test(String(text).toLowerCase());
};

export function validarCuit(cuitNoValidado) {
    cuitNoValidado = cuitNoValidado.toString();
    // console.log('cuitNoValidado', cuitNoValidado);
    let cuitSoloNumeros = cuitNoValidado.replace(REG_EXP_DIFFERENT_OF_NUMBER, '');
    // console.log('cuitSoloNumeros1', cuitSoloNumeros);
    if (cuitSoloNumeros.length != 11) { return false };

    let acumulado = 0;
    let arrayDigitos = cuitSoloNumeros.split("");
    let ultimoDigito = arrayDigitos.pop(); // elimina el último elemento y lo retorna

    arrayDigitos.forEach((element, key) => {
        acumulado += arrayDigitos[9 - key] * (2 + (key % 6));
    });

    let verif = (11 - (acumulado % 11)) == 11
        ? 0
        : 11 - (acumulado % 11);

    return ultimoDigito == verif;
}

export function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

/**
 * A partir de un tipo entidad y un dni calcula el cuit
 * 
 * @param string,integer dni
 * @param string tipoEntidadParam  20, 30 por ejemplo
 * @return integer  NroCuit
 */
export function calculateCuitFromDni(doc, kind) {
    if (!['M', 'F', 'E'].includes(kind)) { return false; }
    let prefix = kind === 'M' ? '20' : kind === 'F' ? '27' : '30'

    // Completa con ceros a la izquierda si es menor a la longitud indicada, 8 por defecto
    const completeLeftZeros = (val, len = 8, padChar = '0') => {
        let str = isNaN(val) ? val : val.toString()
        const dif = len - str.length
        return dif <= 0 ? str : `${padChar.repeat(dif)}${str}`
    }
    let doc_completed_zeros = completeLeftZeros(doc)


    // fn Convierte string de nro a un array de numeros int
    const str2nums = str => str.split('').map(c => parseInt(c))

    // Arma un array de pares de elementos de dos arrays
    const zip = (arr1, arr2) => {
        let i, index, len1, n, ret
        ret = []
        for (index = i = 0, len1 = arr1.length; i < len1; index = ++i) {
            n = arr1[index]
            ret.push([n, arr2[index]])
        }
        return ret
    }

    const prefix_doc_completed_zeros = `${prefix}${doc_completed_zeros}`
    const factors = '5432765432';
    const zipped = zip(str2nums(factors), str2nums(prefix_doc_completed_zeros))
    const products = zipped.map((x) => x[0] * x[1])
    const sum = products.reduce((n, acum) => n + acum, 0)
    const rest = sum % 11

    // console.log('RESTOOO', rest);

    let digit_verificador = '';
    if (kind === 'E') {
        digit_verificador = (11 - rest).toString()
    } else {
        switch (rest) {
            case 0:
                digit_verificador = '0'
                break
            case 1:
                prefix = '23'
                if (kind === 'F') { digit_verificador = '4'; break; }
                if (kind === 'M') { digit_verificador = '9'; break; }
            default:
                digit_verificador = (11 - rest).toString()
        }
    }

    return prefix + doc_completed_zeros + digit_verificador;
}