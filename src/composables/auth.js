import { useCookies } from "@vueuse/integrations/useCookies";

const cookies = useCookies();

let tokenKey = "admin-token";
let getcookie = () => {
  return cookies.get(tokenKey);
};

let setcookie = (val) => {
  cookies.set(tokenKey, val);
};

let delcookie = () => {
  cookies.remove(tokenKey);
};

export { getcookie, setcookie, delcookie };
