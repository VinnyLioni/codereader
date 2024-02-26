<script setup lang="ts">
    import { useBarStore } from '../../store/barcode';

    const barStore = useBarStore()
</script>

<template>
    <table class="border-slate-100 border-[0.2rem] rounded-md w-80">
        <thead class="text-slate-900 bg-slate-100">
            <tr class="text-xl font-semibold tracking-tighter">
                <th class="w-10/12 text-start">Código</th>
                <th class="w-2/12 text-start">Tipo</th>
            </tr>
        </thead>
        <tbody class="">
            <tr v-for="(item, index) in barStore.codeHistory" :key="index" class="text-slate-100">
                <td>{{ item }}</td>
                <td>{{ index }}</td>
            </tr>
        </tbody>
    </table>
</template>