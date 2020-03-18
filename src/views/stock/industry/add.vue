<template>
<div>
  
    
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="行业">
        <el-input v-model="form.iname"></el-input>
      </el-form-item>
      <el-form-item label="是否关注" prop="follow">
        <el-switch v-model="form.ifollow" :active-value=1 :inactive-value=0></el-switch>
      </el-form-item>
        <el-form-item label="其他">
        <el-input v-model="form.idescribe"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">新增</el-button>
      </el-form-item>
    </el-form>
  
</div>
</template>
<script>
import { addIndustry } from '@/api/stock'
export default {
  name: 'add_dialog',
  // 在props属性里接收父组件传递过来的数据
  props: ["dialogAddVisible","industry_options"],
  data() {
    return {
      form: {
          iid: null,
          iname: null,
          ifollow: 1,
          idescribe: null
      }
    }
  },
  methods: {
    async add_individual() {
      const { data } = await addIndustry(this.form)
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