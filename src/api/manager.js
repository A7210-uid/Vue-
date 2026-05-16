import axios from "~/axios";
let login = (username, password) => {
  return axios.post("/admin/login", { username, password });
};

let logout = () => {
  return axios.post("/admin/logout");
};

let getinfo = () => {
  return axios.post("/admin/getinfo");
};

let updatepassword = (data) => {
  return axios.post("/admin/updatepassword", data);
};

export { login, logout, getinfo, updatepassword };
