<script setup lang="ts">
    import { useBarStore } from '../../store/barcode';

    const app = useBarStore()


</script>

<template>
    <header class="flex flex-row p-6 items-center shadow-md">
        <div class="flex flex-row items-baseline">
            <span class="text-2xl font-extrabold tracking-tight text-slate-100">Code</span>
            <span class="text-md font-bold tracking-tighter text-slate-400">Reader</span>
        </div>
        <div class="ml-auto flex flex-col gap-2" @click="app.setOpen()">
            <div class="content-[''] w-8 h-1 rounded-md bg-slate-100 duration-200" :class="app.isOpen ? 'rotate-12' : ''"></div>
            <div class="content-[''] w-8 h-1 rounded-md bg-slate-100 duration-200" :class="app.isOpen ? '-ml-1' : ''"></div>
            <div class="content-[''] w-8 h-1 rounded-md bg-slate-100 duration-200" :class="app.isOpen ? '-rotate-12' : ''"></div>
        </div>
    </header>
</template>