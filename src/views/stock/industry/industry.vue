<template>
  <div class="app-container">
    <el-button @click="dialogAddVisible = true" type="primary" size="mini" round>新增</el-button>
       
    <el-table height="420" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" prop="iid" width="60">
      </el-table-column>
      <el-table-column align="center" label="行业" prop="iname" width="120">
      </el-table-column>

      <el-table-column width="120px" align="center" label="关注">
        <template slot-scope="scope">
          <el-tag
          :type="scope.row.ifollow == 0 ? 'success' : 'danger'"
          disable-transitions>{{scope.row.ifollow == 0 ? '-' : 'care'}}</el-tag>
        </template>
      </el-table-column>
      
      <el-table-column align="center" label="其他" prop="idescribe" width="280">
      </el-table-column>

      <el-table-column align="center" label="Actions" width="120">
        <template slot-scope="scope">
          <el-button @click="origin_data = scope.row;dialogModifyVisible = true" type="primary" size="mini" round>修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="listQuery.page"
      :page-sizes="[10, 30, 50, 100, 400]"
      :page-size="listQuery.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="listTotal">
    </el-pagination>

    <el-dialog :visible.sync="dialogModifyVisible" title="修改">
      <modify_dialog
        v-bind:form="origin_data"
        v-bind:dialogModifyVisible.sync="dialogModifyVisible">
      </modify_dialog>
    </el-dialog>
    <el-dialog :visible.sync="dialogAddVisible" title="新增">
      <add_dialog
        @getList="getList"
        v-bind:dialogAddVisible.sync="dialogAddVisible">
      </add_dialog>
    </el-dialog>
  </div>
</template>

<script>
import { fetchIndustry } from '@/api/stock'
import modify_dialog from '@/views/stock/industry/modify.vue'
import add_dialog from '@/views/stock/industry/add.vue'

export default {
  name: 'individual',
  components: {
      modify_dialog,
      add_dialog
  },

  data() {
    return {
      origin_data: null,
      dialogModifyVisible: false,
      dialogAddVisible: false,
      list: null,
      listLoading: true,
      listTotal: 0,
      listQuery: {
        page: 1,
        limit: 30
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      const { data } = await fetchIndustry(this.listQuery)
      const items = data.items
      this.listTotal = data.total
      this.list = items
      this.listLoading = false
    },
    
    handleSizeChange(size){
        this.listQuery.limit = size;
        this.getList()
    },
    handleCurrentChange(page){
        this.listQuery.page = page;
        this.getList()
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}

</style>

