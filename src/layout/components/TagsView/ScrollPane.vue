<template>
  <el-scrollbar ref="scrollContainer" :vertical="false" class="scroll-container" @wheel.native.prevent="handleScroll">
    <slot />
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount, onMounted } from 'vue'
import { ElScrollbar } from 'element-plus'
const tagAndTagSpacing = 4 // tagAndTagSpacing
let scrollContainer = ref()
// const scrollWrapper = computed(()=>{
//   return scrollContainer.value
// })
const emit = defineEmits(['scroll'])
const handleScroll = (e:any)=> {
  const eventDelta = e.wheelDelta || - e.deltaY * 40
  const $scrollWrapper = document.querySelector('.scroll-container')
  $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
}

const emitScroll = ()=> {
  emit('scroll')
}
onMounted(()=> {
  const scrollWrapper = document.querySelector('.scroll-container')
  scrollWrapper.addEventListener('scroll',emitScroll, true)
})

const moveToTarget = (currentTag:any) => {
  const $container = scrollContainer.value.$el
  const $containerWidth = $container.offsetWidth
  const $scrollWrapper = document.querySelector('.scroll-container')
  const tagList = document.querySelector('#tag')

  let firstTag = null
  let lastTag = null

  // find first tag and last tag
  if (Array.isArray(tagList) && tagList.length > 0) {
    firstTag = tagList[0]
    lastTag = tagList[tagList.length - 1]
  }

  if (firstTag === currentTag) {
    $scrollWrapper.scrollLeft = 0
  } else if (lastTag === currentTag) {
    $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
  } else if(Array.isArray(tagList)){
    // find preTag and nextTag
    const currentIndex = tagList.findIndex((item:any) => item === currentTag)
    const prevTag = tagList[currentIndex - 1]
    const nextTag = tagList[currentIndex + 1]

    // the tag's offsetLeft after of nextTag
    const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing

    // the tag's offsetLeft before of prevTag
    const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing

    if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
      $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
    } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
      $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
    }
  }
}

defineExpose({
  moveToTarget
});
// onBeforeUnmount(()=> {
//   scrollWrapper.value.removeEventListener('scroll', emitScroll)
// })

</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  ::v-deep {
    .el-scrollbar__bar {
      bottom: 0;
    }
    .el-scrollbar__wrap {
      height: 59px;
    }
  }
}
</style>
