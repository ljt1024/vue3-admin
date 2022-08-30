<template>
    <div>
        <el-form :model="searchForm" label-position="left" label-width="80px" :inline="true">
            <el-form-item label="文章标题">
                <el-input v-model="searchForm.title" class="ipt"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">搜索</el-button>
                <el-button type="warning" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table
            :data="tableData"
            border
            style="width: 100%"
            table-layout="auto"
            v-loading="tableLoading"
            empty-text ='暂无数据'>
            <el-table-column prop="title" label="文章标题"/>
            <el-table-column prop="img" label="文章图片" >
                <template #default="scope">
                    <el-image
                        style="width: 80px;"
                        :src="scope.row.img"
                        :preview-src-list="[scope.row.img]"
                        :initial-index="1"
                        fit="cover"
                        :preview-teleported="true"
                    />
                </template>
            </el-table-column>
            <el-table-column prop="abstract" label="文章简介"/>
            <el-table-column prop="author" label="作者"/>
            <el-table-column prop="comments" label="评论数"/>
            <el-table-column prop="thumbs" label="点赞数"/>
            <el-table-column prop="readNum" label="阅读数"/>
            <el-table-column prop="category" label="分类标签"/>
            <el-table-column prop="ispublish" label="是否发布">
                <template #default="scope">
                    <el-switch
                        v-model="scope.row.ispublish"
                        inline-prompt
                        :disabled="true"
                    />
                </template>
            </el-table-column>
            <el-table-column prop="isrecommend" label="是否推荐">
                <template #default="scope">
                    <el-switch
                        v-model="scope.row.isrecommend"
                        inline-prompt
                        :disabled="true"
                    />
                </template>
            </el-table-column>
            <el-table-column prop="creatTime" label="创建时间"/>
            <el-table-column prop="" label="操作">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="handleClick(scope.row)">查看</el-button>
                    <el-button link type="primary" size="small">编辑</el-button>
                    <el-button link type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            layout="prev, pager, next"
            v-model:total = "total"
            v-model:page-size = "pageSize"
            v-model:currentPage = "currentPage"
            @update:current-page ='handleCurrentChange'
            class="pagination"/>
        <el-dialog
            v-model="formVisible"
            title="文章详情"
            width="30%"
            >
            <el-form :model="form" label-width="80px" label-position="left" :rules="rules" ref="ruleFormRef">
                <el-form-item label="文章标题:" prop="username">
                    <el-input v-model="form.title" />
                </el-form-item>
                <el-form-item label="文章图片:" prop="img">

                </el-form-item>

            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="formVisible = false">取消</el-button>
                    <el-button type="primary" @click="formVisible = false">确认</el-button>
                 </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
    import { reactive, ref  } from 'vue'
    import { getArticleList } from '@/api/articleManager'
    let searchForm = reactive<{
        title?:string,
        page?:number,
        rows?:number
    }>({})
    let tableData = ref([])
    let total = ref()
    let currentPage = ref(1)
    let pageSize = ref(10)
    let tableLoading = ref(false)
    let formVisible = ref(false)
    const form = ref<{
          title?:string,
          img?: string
    }>({})
    searchForm.rows = pageSize.value
    searchForm.page = currentPage.value
    const getUser = ()=> {
        tableLoading.value = true
        getArticleList(searchForm).then(res=> {
            tableData.value = res.data
            total.value = res.total
            tableLoading.value = false
        })
    }
    getUser()
    const search = ()=> {
        getUser()
    }
    const reset = ()=> {
        searchForm.title = ''
        searchForm.page = 1
        getUser()
    }
    const handleCurrentChange = (val: number)=> {
        console.log(val);
        searchForm.page = val
        getUser()
    }
    const handleClick = (value:object)=> {
        formVisible.value = true
        form.value = value
    }
</script>

<style scoped lang="scss">
    .ipt {
        width: 240px;
    }
    .pagination {
        display: flex;
        justify-content: flex-end;
        margin-top: 16px;
    }
    .photo {
        width: 80px;
    }
</style>
