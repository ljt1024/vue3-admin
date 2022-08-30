<template>
    <div>
        <el-form :model="searchForm" label-position="left" label-width="80px" :inline="true">
            <el-form-item label="标签名">
                <el-input v-model="searchForm.columnName" class="ipt"/>
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
            <el-table-column prop="columnName" label="标签名" />
            <el-table-column prop="columnAbstract" label="描述" />
        </el-table>
        <el-pagination
                background
                layout="prev, pager, next"
                v-model:total = "total"
                v-model:page-size = "pageSize"
                v-model:currentPage = "currentPage"
                @update:current-page ='handleCurrentChange'
                class="pagination"/>
    </div>
</template>

<script lang="ts" setup>
    import { reactive, ref  } from 'vue'
    import { getColumnList } from '@/api/tags'
    let searchForm = reactive<{
        columnName?:string,
        page?:number,
        rows?:number
    }>({})
    let tableData = ref([])
    let total = ref()
    let currentPage = ref(1)
    let pageSize = ref(10)
    let tableLoading = ref(false)
    searchForm.rows = pageSize.value
    searchForm.page = currentPage.value
    const getUser = ()=> {
        tableLoading.value = true
        getColumnList(searchForm).then(res=> {
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
        searchForm.columnName = ''
        searchForm.page = 1
        getUser()
    }
    const handleCurrentChange = (val: number)=> {
        console.log(val);
        searchForm.page = val
        getUser()
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
</style>
