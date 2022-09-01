import { defineStore } from 'pinia'

export const useSetStore = defineStore('set', {
    state: () => {
        return { isCollapse: false }
    },
    actions: {
        changeCollapse() {
            this.isCollapse = !this.isCollapse
        },
    },
})
