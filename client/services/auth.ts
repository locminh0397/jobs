import { TypeGoogleLogin, TypeUserSignin, TypeUserSignup } from "./../type.d";
import { http, httpServer } from "./http";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const userSignup = async (user: TypeUserSignup) => {
  const res = await http.post("/auth/user/signup", user);
  return res.data;
};

export const userSignin = async (user: TypeUserSignin) => {
  const res = await http.post("/auth/user/signin", user);
  return res.data;
};

export const googleLogin = async (user: TypeGoogleLogin) => {
  const res = await http.post("/auth/user/google-login", user);
  return res.data;
};

export const getUser = async (token?: string) => {
  const res = await http.get("/auth/get-user");
  return res.data;
};

export const getAuth = async (token?: string) => {
  const res = await httpServer.get("/auth/get-user", {
    headers: { Authorization: "Bearer " + token },
  });
  return res.data;
};

export const logout = () => {
  cookies.remove("access_token");
};
