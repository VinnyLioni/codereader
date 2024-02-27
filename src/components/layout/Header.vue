<script setup lang="ts">
    import { appStore } from '../../store/appstore';

    const app = appStore()

    const openMenu = () => {
        if (app.isOpen) {
            app.isOpen=false
        } else {
            app.setOpen(true)
        }
    }

</script>

<template>
    <header class="flex flex-row p-6 items-center shadow-md z-10">
        <div class="flex flex-row items-baseline">
            <span class="text-2xl font-extrabold tracking-tight text-slate-100">Code</span>
            <span class="text-md font-bold tracking-tighter text-slate-400">Reader</span>
        </div>
        <button class="ml-auto flex flex-col gap-2" @click="openMenu()">
            <div class="content-[''] w-8 h-1 rounded-md bg-slate-100 duration-200" :class="app.isOpen ? 'rotate-6' : ''"></div>
            <div class="content-[''] w-8 h-1 rounded-md bg-slate-100 duration-200" :class="app.isOpen ? '-ml-[0.1rem]' : ''"></div>
            <div class="content-[''] w-8 h-1 rounded-md bg-slate-100 duration-200" :class="app.isOpen ? '-rotate-6' : ''"></div>
        </button>
    </header>
</template>