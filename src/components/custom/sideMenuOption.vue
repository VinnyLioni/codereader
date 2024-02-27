<script setup lang="ts">
    const props = defineProps({
        title: String,
        icon: String,
    })

    props.title
    props.icon

</script>

<template>
    <div class="flex flex-row items-center w-full pr-2 py-6 justify-between tracking-tight bg-slate-100 text-slate-950 rounded-md shadow-md">
        <i :class="props.icon" class="w-2/12 text-2xl font-extrabold"></i>
        <span class="ml-auto w-10/12 text-md font-bold">{{ props.title }}</span>
    </div>
</template>