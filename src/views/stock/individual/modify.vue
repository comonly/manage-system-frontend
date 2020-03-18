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
      <el-form-item label="是否关注">
        <el-switch v-model="form.ifollow" :active-value=1 :inactive-value=0></el-switch>
      </el-form-item>
      <el-form-item label="概念">
        <el-input v-model="form.iconcept"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.idescribe"></el-input>
      </el-form-item>
        <el-form-item label="添加时间">
        <el-date-picker
          v-model="form.itime"
          type="datetime"
          disabled
          placeholder="日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
      </el-form-item>
    </el-form>

</div>
</template>
<script>
import { updateIndividual } from '@/api/stock'
export default {
  name: 'modify_dialog',
  // 在props属性里接收父组件传递过来的数据
  props: ["form","dialogModifyVisible","industry_options"],
  data() {
    return {

    }
  },
  methods: {
    async modify_individual() {
      const { data } = await updateIndividual(this.form)
      this.$message({
          showClose: true,
          message: '修改成功',
          type: 'success'
        });
      this.$emit('update:dialogModifyVisible', false)
    },
    onSubmit() {
      this.modify_individual();
    }
  }
}
</script>