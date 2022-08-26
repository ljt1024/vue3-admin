<template>
    <div>
        {{counter.count}}
        <button @click="add" class="btn">+</button>
    </div>
</template>

<script lang="ts" setup>
import { useCounterStore } from '@/store'
const counter = useCounterStore()
const add = ():void => {
  //counter.$patch({ count: counter.count + 1 })
  counter.increment()
}

</script>

<style lang="scss">

</style>
