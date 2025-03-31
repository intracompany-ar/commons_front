import { createApp } from 'vue'
import { createPinia } from 'pinia'

export function mountComponent(component: any, id: string, routerParam: any = null, pinia: any = null) {
    const el = document.getElementById(id);
    if (!el) { return; }
    const app = createApp(component, el.dataset);
    if (pinia) {
        const piniaInstance = createPinia();
        app.use(piniaInstance);
    }
    if (routerParam) {
        app.use(routerParam);
    }
    app.mount("#" + id);
}
