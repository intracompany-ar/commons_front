import { ref } from 'vue'

type AdviceType = 'success' | 'warning' | 'danger' | 'info'

export const advice = ref<{ type: AdviceType, message: string | string[], title: string } | null>(null)

export function showAdvice(type: AdviceType, message: string | string[], title: string = '') {
    advice.value = { type, message, title }
}