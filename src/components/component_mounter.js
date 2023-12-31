import { createApp } from 'vue'

export function mountComponent(component, id, routerParam = null) {
    const el = document.getElementById(id)
    if (!el) { return }
        const app = createApp(component, el.dataset);
    if (routerParam) {
        app.use(routerParam);
    }
    app.mount("#" + id);
}
