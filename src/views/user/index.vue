<template>
  <el-form :model="searchForm" label-position="left" label-width="80px" :inline="true">
      <el-form-item label="用户名">
          <el-input v-model="searchForm.username" class="ipt"/>
      </el-form-item>
      <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button type="warning">重置</el-button>
      </el-form-item>
  </el-form>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" width="240"/>
  </el-table>
   <el-pagination background layout="prev, pager, next" :total="1000" class="pagination"/>
</template>

<script lang="ts" setup>
    import { reactive } from 'vue'
    import { getUserList } from '@/api/userManager'
    const searchForm = reactive<{
        username?:string
    }>({})
    getUserList({}).then(res=> {
        
    })
    const tableData = [
        {
            date: '2016-05-03',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-02',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-04',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-01',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
    ]
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
