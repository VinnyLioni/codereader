import { defineStore } from "pinia";

export const appStore = defineStore("menu", {
  state: () => ({
    isOpen: false,
  }),
  actions: {
    setOpen(payload: boolean) {
      this.isOpen = payload;
    },
  },
});
