import { ElNotification, ElMessageBox } from "element-plus";
import NProgress from "nprogress";

let toast = ({
  type = "success",
  message,
  dangerouslyUseHTMLString = false,
}) => {
  ElNotification({
    type,
    message,
    dangerouslyUseHTMLString,
    duration: 3000,
  });
};

let showModal = (content = "是否要退出登录?", type = "warning") => {
  return ElMessageBox.confirm(content, {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type,
  });
};
let showFullLoading = () => {
  NProgress.start();
};

let hideFullLoading = () => {
  NProgress.done();
};

export { toast, showModal, showFullLoading, hideFullLoading };
