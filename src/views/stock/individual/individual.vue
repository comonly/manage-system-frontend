<template>
  <div class="app-container">
    <el-button @click="dialogAdd" type="primary" size="mini" round>新增</el-button>
       
    <el-table height="420" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="编码" prop="icode" width="80">
      </el-table-column>
      <el-table-column align="center" label="名称" prop="iname" width="80">
      </el-table-column>

      <el-table-column align="center" label="行业" :formatter="industryFormat" prop="iindustry" width="80">
      </el-table-column>

      <el-table-column align="center" label="概念" prop="iconcept" width="580">
      </el-table-column>
      <el-table-column align="center" label="其它" prop="idescribe" width="100">
      </el-table-column>

      <el-table-column width="80px" align="center" label="关注">
        <template slot-scope="scope">
          <el-tag
          :type="scope.row.ifollow == 0 ? 'success' : 'danger'"
          disable-transitions>{{scope.row.ifollow == 0 ? '-' : 'care'}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="100">
        <template slot-scope="scope">
          <el-button @click="dialogModify(scope.$index, scope.row)" type="primary" size="mini" round>修改</el-button>
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
        v-bind:dialogModifyVisible.sync="dialogModifyVisible"
        v-bind:industry_options="industryList">
      </modify_dialog>
    </el-dialog>
    <el-dialog :visible.sync="dialogAddVisible" title="新增">
      <add_dialog
        @getList="getList"
        v-bind:dialogAddVisible.sync="dialogAddVisible"
        v-bind:industry_options="industryList">
      </add_dialog>
    </el-dialog>
  </div>
</template>

<script>
import { fetchIndividual } from '@/api/stock'
import { fetchIndustry } from '@/api/stock'
import modify_dialog from '@/views/stock/individual/modify.vue'
import add_dialog from '@/views/stock/individual/add.vue'

export default {
  name: 'individual',
  components: {
      modify_dialog,
      add_dialog
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      origin_data: {
          icode: null,
          iname: null,
          iindustry: null,
          ifollow: null,
          iconcept: null,
          idescribe: null
      },
      dialogModifyVisible: false,
      dialogAddVisible: false,
      list: null,
      industryList: null,
      listLoading: true,
      listTotal: 0,
      listQuery: {
        page: 1,
        limit: 30
      }
    }
  },
  created() {
    this.getIndustryList();
    this.getList();
  },
  methods: {
    async getList() {
      this.listLoading = true
      const { data } = await fetchIndividual(this.listQuery)
      const items = data.items
      this.listTotal = data.total
      this.list = items.map(v => {
        this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
        v.originalTitle = v.title //  will be used when user click the cancel botton
        return v
      })
      this.listLoading = false
    },
    async getIndustryList() {
      const { data } = await fetchIndustry(this.listQuery)
      this.industryList = data.items
    },
    dialogAdd(){
      this.dialogAddVisible = true;
    },
    dialogModify(index,row){
      this.origin_data = row;
      this.dialogModifyVisible = true
    },
    industryFormat(row, column) {
      for(var i = 0;i<this.industryList.length;i++)
      {
        if(row.iindustry == this.industryList[i].iid)
        return this.industryList[i].iname;
      }
      return null;
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

