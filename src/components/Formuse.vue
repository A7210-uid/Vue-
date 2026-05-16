<template>
  <el-form :model="form" :rules="rules" :ref="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="用户名">
      <el-input v-model="form.username" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.password" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

// do not use same name with ref
const form = reactive({
  username: "",
  password: "",
});
const rules ={
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 5, message: '长度输入必须是3到5', trigger: 'blur' },
  ],
 
}


const onSubmit = () => {
  console.log("submit!");
};
</script>
