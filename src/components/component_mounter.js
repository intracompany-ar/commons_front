import { createApp } from 'vue'
import { createPinia } from 'pinia'

export function mountComponent(component, id, routerParam = null, pinia = null) {
    const el = document.getElementById(id)
    if (!el) { return }
        const app = createApp(component, el.dataset);
    if (pinia) {
        const pinia = createPinia()
        app.use(pinia);
    }
    if (routerParam) {
        app.use(routerParam);
    }
    app.mount("#" + id);
}
