<script setup lang="ts">
    import { appStore } from '../../store/appstore';
    import sideMenuOption from '../custom/sideMenuOption.vue'

    const app = appStore()

    const newRoute = () => {
        window.open('https://vini-portfoil.web.app/')
    }

    const wpp = () => {
        window.open('https://api.whatsapp.com/send?phone=5511981080308&text=Ol%C3%A1,%20gostaria%20de%20saber%20sobre%20o%20leitor', '_blank')
    }

</script>

<template>
    <transition name="slide-fade">
        <aside class="fixed w-5/6 text-slate-100 flex flex-col p-6 h-screen z-20 shadow-2xl bg-slate-800" v-show="app.isOpen">
            <header class="flex flex-row items-baseline">
                <span class="text-2xl font-extrabold tracking-tight text-slate-100">Code</span>
                <span class="text-md font-bold tracking-tighter text-slate-400">Reader</span>
            </header>
            <main class="w-full flex justify-center flex-col mt-10 gap-2"> 
                <sideMenuOption title="Retornar para Portfólio" icon="fas fa-angle-left" @click="newRoute"/>
                <sideMenuOption title="Entre em contato comigo" icon="fab fa-whatsapp" @click="wpp"/>
            </main>
            <footer class="mt-auto">
            </footer>
        </aside>
    </transition>
</template>

<style>
    .slide-fade-enter-active {
        transition: all 0.1s ease-out;
    }

    .slide-fade-leave-active {
        transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .slide-fade-enter-from,
    .slide-fade-leave-to {
        transform: translateX(-200px);
        opacity: 0;
    }
</style>