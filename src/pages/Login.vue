<script setup>
import { onBeforeUnmount, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "~/composables/util";

import { useUserStore } from "~/store";

const store = useUserStore();

const router = useRouter();
const ruleForm = reactive({
  username: "",
  password: "",
});

const ruleFormRef = ref(null);
const rules = reactive({
  username: [
    { required: true, message: "用户名输入不能为空", trigger: "blur" },
    { min: 3, max: 5, message: "长度必须是3-5", trigger: "blur" },
  ],
});

const loading = ref(false);

const submitForm = function () {
  ruleFormRef.value.validate((res) => {
    if (res) {
      loading.value = true;
      // login(ruleForm.username, ruleForm.password)
      //   .then((suc) => {
      //     //1.弹出登录成功
      //     toast({
      //       message: "登录成功",
      //     });
      //     //2.保存登录成功数据token
      //     setcookie(suc.token);
      //     //3.跳转到首页
      //     router.push("/");
      //   })
      //   .catch((err) => {
      //     toast({message:err.response.data.msg,type:'error'})
      //   })
      store
        .login(ruleForm.username, ruleForm.password)
        .then((res) => {
          toast({ message: "登录成功" });
          router.push("/");
        })
        .catch((err) => {
          toast({ message: err, type: "error" });
        })
        .finally(() => (loading.value = false));
    }
  });
};

const handleKeyup = (e) => {
  // e.key === "Enter" ? submitForm() : "";
  if (e.key === "Enter") submitForm();
};
onMounted(() => {
  document.addEventListener("keyup", handleKeyup);
});

onBeforeUnmount(() => {
  document.removeEventListener("keyup", handleKeyup);
});
</script>
<template>
  <el-row class="box">
    <el-col :lg="16" :md="12" class="left">
      <div>
        <div>欢迎光临</div>
        <div>此站点是《vue3 + vite实战商城后台开发》视频课程的演示地址</div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="right">
      <h2>欢迎回来</h2>
      <div>
        <span class="w-15 h-px bg-gray-300"></span>
        <span class="text-gray-300">账号密码登录</span>
        <span class="w-15 h-px bg-gray-300"></span>
      </div>
      <!-- 表单部分设计 -->
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        :rules="rules"
        class="w-[250px]"
      >
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.username"
            placeholder="请输入用户名"
            prefix-icon="User"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            type="password"
            show-password
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm(ruleFormRef)"
            round
            class="w-full bg-indigo-500 hover:bg-indigo-200"
            :loading="loading"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style scoped>
.box {
  @apply h-screen bg-indigo-500;
}
.box .left {
  @apply flex flex justify-center items-center text-light-50;
}
.box .left > div > div:first-child {
  @apply text-5xl font-bold mb-5;
}
.box .right {
  @apply flex flex-col justify-center items-center bg-light-50;
}
.box .right h2 {
  @apply text-3xl font-bold;
}
.box .right div {
  @apply my-3 flex justify-center items-center space-x-3;
}
</style>
