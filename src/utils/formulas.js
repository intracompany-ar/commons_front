import { ref, computed } from 'vue'
import dayjs from 'dayjs'

const DIAS_ANIO = 365;

export function promPonderadoDiasCobro(keyDateName = 'fec', keyAmountNane = 'imp') {

    const filas = ref([]);
    const fechabase = ref(dayjs().format("YYYY-MM-DD"));
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

    /**
    * Suma los días ponderados de pago
    */
    const fechaPromCobro = computed(() => {
        return dayjs(fechabase.value).add(promPondDiasPago.value, 'days').format('DD/MM/YYYY')
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
     * 
     * @param {array} filas [{fecha: '2023-01-01', importe: 5555}]
     */
    function calculate(filasParam, baseDate = null, fechabaseParam = null) {
        filas.value = filasParam;
        fechabase.value = fechabaseParam ?? fechabase.value;

        const base = baseDate ?? dayjs().format("YYYY-MM-DD");
        if (filas.value) {

            filas.value.forEach(element => {
                if (element[keyDateName] != '' && element[keyAmountNane] != '') {
                    let date1 = dayjs(base);
                    let date2 = dayjs(element[keyDateName]);
                    element.plazo = date2.diff(date1, 'days');
                    element.plazo = element.plazo < 0 ? 0 : element.plazo;

                    // Ponderaciones
                    let pond = element[keyAmountNane] / importeTotal.value;// Ponderación del cheque según importes (sobre total)
                    element.pond = Math.round(element.plazo * pond * 100) / 100;// Pond son los días de pago ponderados por lo que "pesa" el cheque
                }
            })
        }

    }


    return { calculate, importeTotal, fechaPromCobro, promPondDiasPago }
}



export function round(value, decimals = 2) {
    let factor = 10 ** decimals;
    let result = Math.round(value * factor) / factor;
    return isNaN(result) ? '' : parseFloat(result);
};

/**
 * Tasa nominal anual vencida a tasa nominal anual adelantada
 * @param {float} tnav 
 * @returns 
 */
export function tnavToTnaa(tnav) // retorna como indíce (no %) Tasa nominal anual vencia a adelantada
{
    return round(parseFloat(tnav) / (1 + parseFloat(tnav)), 12);
}

export function tnaa_to_tnav(tnaa) // retorna como indíce (no %)
{
    return round(parseFloat(tnaa) / (1 - parseFloat(tnaa)), 12);
};

/**
 * Tasa nominal anual vencida a tasa nominal diaria vencida
 * @param {float} tnav 
 * @param {int} diasPorAnio 
 * @returns 
 */
export function tnavToTndv(tnav, diasPorAnio = DIAS_ANIO)// diasPorAnio a veces usan 360
{
    return round(tnav / diasPorAnio, 12);
};

export function tasaRecargada_to_tnav(tasaRecargo, diasAlVencimiento, diasPorAnio = DIAS_ANIO)// diasPorAnio a veces usan 360
{
    let tnav = tasaRecargo / diasAlVencimiento * diasPorAnio;
    return round(tnav, 12);
};

export function tasaRecargada_to_tea(tasaRecargo, diasAlVencimiento, diasPorAnio = DIAS_ANIO)// diasPorAnio a veces usan 360
{
    // i *(1+x)^dias = f => (f/i)^(1/dias) -1 = x => x^365 = TEA
    let tasaDiaria = parseFloat(tasaRecargo) ** (1 / parseFloat(diasAlVencimiento)) - 1;

    return round((1 + tasaDiaria) ** DIAS_ANIO - 1, 12);
}


export function tir(cashFlows, iterations = 1000, tolerance = 0.00001) {
    const npv = (rate) => {
        return cashFlows.reduce((acc, cashFlow, index) => {
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