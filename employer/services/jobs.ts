import { TypeJobEditForm, TypeJobForm } from "../types";
import { http } from "./http";

export const createJobs = async (dataForm: TypeJobForm) => {
  const res = await http.post("/jobs/create", dataForm);
  return res.data;
};
export const editJobs = async (dataForm: TypeJobEditForm, id: string) => {
  const res = await http.patch(`/jobs/edit/${id}`, dataForm);
  return res.data;
};
export const deleteJob = async (id: string) => {
  const res = await http.delete(`/jobs/delete/${id}`);
  return res.data;
};

export const getJobs = async (skip?: number, take?: number) => {
  const res = await http.get("/jobs/get-jobs", {
    params: {
      skip: skip,
      take: take,
    },
  });

  return res.data;
};

export const findByTitle = async (title: string) => {
  const res = await http.get(`/jobs/search/?title=${title}`);
  return res.data;
};

export const getAppliedForCompany = async () => {
  const res = await http.get("/jobs/apply-job");
  return res.data;
};
