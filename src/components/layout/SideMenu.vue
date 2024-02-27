<script setup lang="ts">
    import { appStore } from '../../store/appstore';
    import sideMenuOption from '../custom/sideMenuOption.vue'

    const app = appStore()
</script>

<template>
    <transition name="slide-fade">
        <aside class="fixed w-5/6 text-slate-100 flex flex-col p-6 h-screen z-20 shadow-2xl bg-slate-800" v-show="app.isOpen">
            <header class="flex flex-row items-baseline">
                <span class="text-2xl font-extrabold tracking-tight text-slate-100">Code</span>
                <span class="text-md font-bold tracking-tighter text-slate-400">Reader</span>
            </header>
            <main class="w-full flex justify-center flex-col mt-10"> 
                <sideMenuOption title="Retornar para Portfólio" icon="fas fa-angle-left"/>
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