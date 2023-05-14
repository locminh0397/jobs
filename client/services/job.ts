import { http } from "./http";

export const getAllJobs = async (take?: number) => {
  const res = await http.get(`/jobs/get-jobs/?take=${take}`);
  return res.data;
};

export const jobDetail = async (id: string) => {
  const res = await http.get(`/jobs/details/${id}`);
  return res.data;
};

export const getJobByIndustry = async (industry: string, id: string) => {
  const res = await http.get(`/jobs/get-by-industry/${industry}/?id=${id}`);
  return res.data;
};

export const getJobByIndustryWithoutId = async (industry: string) => {
  const res = await http.get(`/jobs/get-by-industry-not-id/${industry}`);
  return res.data;
};

export const applyJob = async (jobId: string) => {
  const res = await http.post(`/apply/create`, { jobId });
  return res.data;
};

export const isApplied = async (jobId: string) => {
  const res = await http.get(`/apply/get-apply/${jobId}`);
  return res.data;
};

export const saveJob = async (job_id: string) => {
  const res = await http.post(`/apply/save`, { job_id });
  return res.data;
};

export const isSaved = async (jobId: string) => {
  const res = await http.get(`/apply/get-save/${jobId}`);
  return res.data;
};

export const getApplyByStudent = async () => {
  const res = await http.get(`/apply/get-apply-student`);
  return res.data;
};

export const getSavedByStudent = async () => {
  const res = await http.get(`/apply/get-save-job`);
  return res.data;
};

export const searchJob = async (title: string, location: string) => {
  const res = await http.get(
    `/jobs/search/?title=${title}&location=${location}`
  );
  return res.data;
};
