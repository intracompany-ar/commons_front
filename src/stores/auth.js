import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuth = defineStore('auth', () => {

    const user = ref((() => {
        try {
            return JSON.parse(localStorage.getItem('user')) || {};
        } catch {
            return {};
        }
    })())
    const token = ref( localStorage.getItem('api-token') || null )
    const redirectAfterLogin = ref(null)

    const isAuthenticated = computed(() => token.value !== null)


    function getUserAuth() {
        return JSON.parse(user.value);

    }

    async function login(tokenParam, userParam) {
        token.value = tokenParam;
        user.value = userParam;
        localStorage.setItem('api-token', tokenParam);
        localStorage.setItem('user', JSON.stringify(userParam));
    }

    async function logout()
    {
        try {
            if (user.value.id) {
                await axios.post(`logout/${user.value.id}`);
            }
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            alert('No se pudo cerrar sesión. Por favor, notifique al administrador del sistema.');
        } finally {
            token.value = null;
            user.value = {};
            localStorage.removeItem('api-token');
            localStorage.removeItem('user');
        }
    }

    

    return {getUserAuth, user, token, logout, login, isAuthenticated, redirectAfterLogin}
})