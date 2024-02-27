import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

export const useBarStore = defineStore('barStore', () => {
    const toast = useToast()
    const codebar = ref<any>()
    const codeHistory = ref<Array<any>>([])
    const rawCode = ref<any>()

    type ToastType = 'success' | 'error' | 'info' | 'warning';

    const showToast = (type: ToastType, message: string) => {
        toast[type](message);
    }

    const isOpen = ref<boolean>(false)

    const setOpen = () => {
        isOpen.value=!isOpen.value
    }

    return {
        codebar,
        codeHistory,
        showToast,
        rawCode,
        isOpen,
        setOpen
    }
})