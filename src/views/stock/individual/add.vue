<template>
<div>
  
    
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="股票代码">
        <el-input v-model="form.icode"></el-input>
      </el-form-item>
      <el-form-item label="股票名字">
        <el-input v-model="form.iname"></el-input>
      </el-form-item>
      <el-form-item label="行业">
        <el-select v-model="form.iindustry" placeholder="请选择行业">
          <el-option
            v-for="item in industry_options"
            :key="item.iid"
            :label="item.iname"
            :value="item.iid">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否关注" prop="follow">
        <el-switch v-model="form.ifollow" :active-value=1 :inactive-value=0></el-switch>
      </el-form-item>
        <el-form-item label="概念">
        <el-input v-model="form.iconcept"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.idescribe"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">新增</el-button>
      </el-form-item>
    </el-form>
  
</div>
</template>
<script>
import { addIndividual } from '@/api/stock'
export default {
  name: 'add_dialog',
  // 在props属性里接收父组件传递过来的数据
  props: ["dialogAddVisible","industry_options"],
  data() {
    return {
      form: {
          icode: null,
          iname: null,
          iindustry: null,
          ifollow: 1,
          iconcept: null,
          idescribe: null
      }
    }
  },
  methods: {
    async add_individual() {
      const { data } = await addIndividual(this.form)
      //const items = data.items
      this.$message({
          showClose: true,
          message: '新增成功',
          type: 'success'
        });
      this.$emit('update:dialogAddVisible', false)
      this.$emit('getList')
    },
    onSubmit() {
      this.add_individual();
    }
  }
}
</script>