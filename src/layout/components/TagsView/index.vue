<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper" @scroll="handleScroll">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag)?'active':''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle.native="!isAffix(tag)?closeSelectedTag(tag):''"
        @contextmenu.prevent.native="openMenu(tag,$event)"
      >
        {{ tag.title }}
        <span v-if="!isAffix(tag) && visitedViews.length > 1" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其它</li>
      <li @click="closeAllTags(selectedTag)">关闭所有</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import ScrollPane from './ScrollPane'
import path from 'path'
import { ref, reactive, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useViewStore } from '@/store/tagsView'

let visible = ref(false)
let top_ = ref(0)
let left_ = ref(0)
let selectedTag = reactive({})
let affixTags_ = ref([])
const view = useViewStore()
const $route = useRoute()
const $router = useRouter()
const firstRoute = ref(null)
const isActive = (route:any)=> {
  return route.path === $route.path
}

const scrollPane = ref<any>()
const tag = ref<any>()
const isAffix = (tag:any) => {
  return tag.meta && tag.meta.affix
}

const filterAffixTags = (routes:any, basePath = '/')=> {
  let tags:any = []
  routes.forEach((route:any) => {
    if (route.meta && route.meta.affix) {
      const tagPath = path.resolve(basePath, route.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta }
      })
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })
  return tags
}

const initTags = ()=> {
  const affixTags:any = affixTags_.value = filterAffixTags($route)
  for (const tag of affixTags) {
    // Must have tag name
    if (tag.name) {
      view.addVisitedView(tag)
    }
  }
}

const addTags = ()=> {
  const { name } = $route
  if (name) {
    view.addView($route)
  }
  return false
}

const moveToCurrentTag = ()=> {
  const tags = tag.value
   nextTick(() => {
    for (const tag of tags) {
      if (tag.to.path === $route.path) {
        scrollPane.value.moveToTarget(tag)
        // when query is different then update
        if (tag.to.fullPath !== $route.fullPath) {
          view.updateVisitedView($route)
        }
        break
      }
    }
  })
}

const refreshSelectedTag = (view:any)=> {
  view.delCachedView(view).then(() => {
    const { fullPath } = view
    nextTick(() => {
      $router.replace({
        path: '/redirect' + fullPath
      })
    })
  })
}

const closeSelectedTag = (view:any) =>{
  view.delView(view).then(({ visitedViews }) => {
    if (isActive(view)) {
      toLastView(visitedViews, view)
    }
  })
}

const closeOthersTags = ()=> {
  $router.push(selectedTag)
  view.delOthersViews(selectedTag).then(() => {
     moveToCurrentTag()
  })
}

const closeAllTags = (view:any)=> {
  view.delAllViews().then(({ visitedViews }) => {
    if (affixTags_.value.some((tag:any) => tag.path === view.path)) {
      return
    }
    toLastView(visitedViews, view)
  })
}

const toLastView = (visitedViews, view)=> {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView) {
      $router.push(latestView.fullPath)
  } else {
    // now the default is to redirect to the home page if there is no tags-view,
    // you can adjust it according to your needs.
    if (view.name === firstRoute.value) {
      // to reload home page
      $router.replace({ path: '/redirect' + view.fullPath })
    } else {
      $router.push({
        name: firstRoute.value,
      })
    }
  }
}
const container:any = document.querySelector('#app')
const openMenu = (tag:object, e:any)=> {
  const menuMinWidth = 105
  const offsetLeft = container.getBoundingClientRect().left // container margin left
  const offsetWidth = container.offsetWidth // container width
  const maxLeft = offsetWidth - menuMinWidth // left boundary
  const left:number = e.clientX - offsetLeft + 15 // 15: margin right

  if (left > maxLeft) {
    left_.value = maxLeft
  } else {
    left_.value = left
  }

  top_.value = e.clientY
  visible.value = true
  selectedTag = tag
}

const closeMenu = ()=>{
  visible.value = false
}

const handleScroll = () => {
  closeMenu()
}

export default {
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: []
    }
  },
  computed: {
    ...mapGetters(['firstRoute']),
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    },
    routes() {
      return this.$store.state.permission.routes
    }
  },
  watch: {
    $route() {
      this.addTags()
      this.moveToCurrentTag()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.initTags()
    this.addTags()
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 46px;
  width: 100%;
  margin-top: 44px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 30px;
      line-height: 30px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 7px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #3760F4;
        color: #fff;
        border-color: #3760F4;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
