<script setup lang="ts">
    const props = defineProps({
        title: String,
        icon: String,
    })

    props.title
    props.icon

</script>

<template>
    <div class="flex flex-row items-center w-full justify-between tracking-tight">
        <i :class="props.icon" class="w-2/12 text-2xl font-extrabold"></i>
        <span class="ml-auto w-9/12 text-lg font-bold">{{ props.title }}</span>
    </div>
</template>