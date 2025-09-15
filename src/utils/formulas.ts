import { ref, computed } from 'vue'
import dayjs from 'dayjs'

const DIAS_ANIO = 365;

interface Fila {
    [key: string]: string | number | undefined;
    plazo?: number;
    pond?: number;
}

export function promPonderadoDiasCobro(keyDateName = 'fec', keyAmountNane = 'imp') {

    const filas = ref<Fila[]>([]);
    const fechabase = ref<string | null>(null);
    /**
     * Suma de los importes de los pagos
     */
    const importeTotal = computed(() => {
        var acum = 0;
        filas.value.forEach(element => {
            acum += Number(element[keyAmountNane]);
        })
        return Math.round(acum * 100) / 100;
    })

    const promPondDiasPago = computed(() => {
        let acum = 0;
        if (filas.value) {
            filas.value.forEach(element => {
                acum += Math.round(Number(element.pond));
            })
        }
        return acum;
    })

    /**
    * Suma los días ponderados de pago
    */
    const fechaPromCobro = computed(() => {
        console.debug('fechabase.value', fechabase.value)
        console.debug('promPondDiasPago.value', promPondDiasPago.value)
        return dayjs(fechabase.value).add(promPondDiasPago.value, 'day').format('DD/MM/YYYY')
    })

    /**
     * 
     * @param {array} filas [{fecha: '2023-01-01', importe: 5555}]
     * @param {string} baseDateParam Fecha base para calcular los días de plazo, es el promedio de facturas
     */
    function calculate(filasParam: Fila[], baseDateParam: string | null = null) {
        filas.value = filasParam;
        fechabase.value = baseDateParam ?? dayjs().format("YYYY-MM-DD");

        if (filas.value) {
            filas.value.forEach(element => {
                if (element[keyDateName] != '' && element[keyAmountNane] != '') {
                    let date1 = dayjs(fechabase.value);
                    let date2 = dayjs(element[keyDateName]);
                    element.plazo = date2.diff(date1, 'day');
                    element.plazo = element.plazo < 0 ? 0 : element.plazo;

                    // Ponderaciones
                    let pond = Number(element[keyAmountNane]) / importeTotal.value;// Ponderación del cheque según importes (sobre total)
                    element.pond = Math.round(element.plazo * pond * 100) / 100;// Pond son los días de pago ponderados por lo que "pesa" el cheque
                }
            })
        }

    }


    return { calculate, importeTotal, fechaPromCobro, promPondDiasPago }
}


export function round(value: number, decimals = 2) {
    let factor = 10 ** decimals;
    let result = Math.round(value * factor) / factor;
    return isNaN(result) ? '' : parseFloat(result.toString());
};

/**
 * Tasa nominal anual vencida a tasa nominal anual adelantada
 * 
 * @param {float} tnav con decimales, no porcentajes
 * @returns 
 */
export function tnavToTnaa(tnav: number, days = 360, daysPerYear = 360): number {
    const m = daysPerYear / days;
    const iPerVenc = tnav / m;                 // tasa por período vencida
    const iPerAdel = iPerVenc / (1 + iPerVenc); // tasa por período adelantada
    return iPerAdel * m;                       // TNA anual adelantada
}

export function tnaaToTnav(tnaa: number, days = 360, daysPerYear = 360): number // retorna como indíce (no %)
{
    const m = daysPerYear / days;// Ej: 360/30 = 12 meses
    const iPerAdel = tnaa / m;// tasa por período adelantada
    if (iPerAdel >= 1) throw new Error('La tasa por período debe ser < 100%.');

    const iPerVenc = iPerAdel / (1 - iPerAdel); // tasa por período vencida
    return iPerVenc * m;                        // TNA vencida anual
}

/**
 * Tasa nominal anual vencida a tasa nominal diaria vencida
 * @param {float} tnav 
 * @param {int} diasPorAnio 
 * @returns 
 */
export function tnavToTndv(tnav: number, diasPorAnio = DIAS_ANIO)// diasPorAnio a veces usan 360
{
    return round(tnav / diasPorAnio, 12);
};

export function tasaRecargada_to_tnav(tasaRecargo: number, diasAlVencimiento: number, diasPorAnio = DIAS_ANIO)// diasPorAnio a veces usan 360
{
    let tnav = tasaRecargo / diasAlVencimiento * diasPorAnio;
    return round(tnav, 12);
};

/**
 * Tasa nominal anual a Tasa efectiva anual
 * 
 * @param {float} tna en porcentaje, ejemplo 80%
 * @param {int} cantidadCapitalizaciones PAra semanal: 52, diario: 365 o 360, mensual: 12
 * @returns float en porcentaje
 */
export function tnaToTea(tna: number, cantidadCapitalizaciones = 12) {
    let tasaNominalMensual = (tna / 100) / cantidadCapitalizaciones;
    return Math.round(((Math.pow((1 + tasaNominalMensual), cantidadCapitalizaciones) - 1)) * 10000) / 100
}
export function teaToTna(tea: number, cantidadCapitalizaciones = 12) {
    return Math.round( (Math.pow(tea / 100 + 1, 1 / cantidadCapitalizaciones) - 1) * cantidadCapitalizaciones * 10000) / 100
}

export function tasaRecargada_to_tea(tasaRecargo: number, diasAlVencimiento: number, diasPorAnio = DIAS_ANIO): number // diasPorAnio a veces usan 360
{
    // i *(1+x)^dias = f => (f/i)^(1/dias) -1 = x => x^365 = TEA
    let tasaDiaria = parseFloat(tasaRecargo.toString()) ** (1 / parseFloat(diasAlVencimiento.toString())) - 1;

    return (1 + tasaDiaria) ** DIAS_ANIO - 1;
}

export function tir(cashFlows: Array<number>, iterations = 1000, tolerance = 0.00001) {
    const npv = (rate: number) => {
        return cashFlows.reduce((acc: number, cashFlow: number, index: number) => {
            return acc + cashFlow / Math.pow(1 + rate, index);
        }, 0);
    };

    let lowerRate = -1.0;
    let upperRate = 1.0;
    let irr = 0.0;

    for (let i = 0; i < iterations; i++) {
        irr = (lowerRate + upperRate) / 2;
        const npvValue = npv(irr);

        if (Math.abs(npvValue) < tolerance) {
            break;
        }

        if (npvValue > 0) {
            lowerRate = irr;
        } else {
            upperRate = irr;
        }
    }

    return irr;
}