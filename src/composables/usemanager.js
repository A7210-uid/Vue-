import { useUserStore } from "~/store";
import { useRouter } from "vue-router";
import { toast } from "~/composables/util";
import { showModal } from "~/composables/util";
import { ref, reactive } from "vue";
import { updatepassword } from "~/api/manager";

// 修改密码功能
const userepassword = () => {
  const router = useRouter();
  const store = useUserStore();
  //抽屉组件引用参数
  const formDrawerRef = ref(null);

  const ruleForm = reactive({
    oldpassword: "",
    password: "",
    repassword: "",
  });

  const ruleFormRef = ref(null);
  const rules = reactive({
    oldpassword: [
      { required: true, message: "旧密码输入不能为空", trigger: "blur" },
    ],
    password: [
      { required: true, message: "新密码输入不能为空", trigger: "blur" },
    ],
    repassword: [
      { required: true, message: "确认密码输入不能为空", trigger: "blur" },
    ],
  });
  const onsubmit = function () {
    ruleFormRef.value.validate((res) => {
      if (res) {
        // loading.value = true;
        formDrawerRef.value.openloading();
        updatepassword(ruleForm)
          .then(() => {
            toast({ message: "修改密码成功" });
            store.logout();
          })
          .finally(() => {
            formDrawerRef.value.closeloading();
          });
      }
    });
  };

  const repassword = () => {
    formDrawerRef.value.opendrawer();
    // console.log("修改密码...");
  };
  return {
    formDrawerRef,
    ruleForm,
    ruleFormRef,
    rules,
    onsubmit,
    repassword,
  };
};

// 退出登录功能
const uselogout = () => {
  const router = useRouter();
  const store = useUserStore();
  const handleLogout = () => {
    showModal().then(() => {
      logout();
    });
  };
  const logout = () => {
    store.logout().then(() => {
      toast({ message: "退出登录成功" });
      router.push("/login");
    });
  };
  return { handleLogout };
};

export { userepassword, uselogout };
