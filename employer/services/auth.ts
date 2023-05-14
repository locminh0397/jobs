import { TypeEmployerForm, TypeEmployerSigninForm } from "../types";
import { http, httpServer } from "./http";

export const getAuthEmployer = async (token?: string) => {
  const res = await httpServer.get("/auth/get-employer", {
    headers: { Authorization: "Bearer " + token },
  });
  return res.data;
};
export const employerSignup = async (data: TypeEmployerForm) => {
  const res = await http.post("/auth/employer/signup", data);
  return res.data;
};
export const employerSignin = async (data: TypeEmployerSigninForm) => {
  const res = await http.post("/auth/employer/signin", data);
  return res.data;
};
