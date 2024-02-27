<script setup lang="ts">
    import { onUnmounted, onMounted } from 'vue';
    import { appStore } from '../store/appstore'
    import Header from '../components/layout/Header.vue';
    import Main from '../components/layout/Main.vue';
    import SideMenu from '../components/layout/SideMenu.vue';

    const app = appStore()

    const clickOutNav = (event: MouseEvent) => {
        const navBarElement = document.querySelector('aside')
        const buttonElement = document.querySelector('button')

        if (navBarElement && !navBarElement.contains(event.target as Node) && buttonElement && !buttonElement.contains(event.target as Node)) {
        app.setOpen(false) // Fechar o menu
        }
    }

  onMounted(() => {
    document.addEventListener('click', clickOutNav)
  })

  onUnmounted(() => {
    document.removeEventListener('click', clickOutNav)
  })


</script>

<template>
    <div class="flex flex-col">
        <Header />
        <SideMenu />
        <div>
            <Main />
        </div>
    </div>
</template>