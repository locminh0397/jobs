import {
  TypeEducation,
  TypeExperienceForm,
  TypePasswords,
  TypeStudentForm,
} from "../type";
import { http } from "./http";

export const editProfileStudent = async (data: TypeStudentForm) => {
  try {
    const res = await http.patch("/auth/user/update-user", data);
    return res.data;
  } catch (error) {
    console.log("Something went wrong");
  }
};

export const createEducation = async (data: TypeEducation) => {
  try {
    const res = await http.post("/student/create-education", data);
    return res.data;
  } catch (error) {
    console.log("Something went wrong");
  }
};

export const getEducation = async () => {
  try {
    const res = await http.get("/student/get-education");
    return res.data;
  } catch (error) {
    console.log("Something went wrong");
  }
};

export const deleteEducation = async (id: string) => {
  try {
    const res = await http.delete(`/student/delete-education/${id}`);
    return res.data;
  } catch (error) {
    console.log("Something went wrong");
  }
};

export const createExperience = async (data: TypeExperienceForm) => {
  try {
    const res = await http.post(`/student/create-experience`, data);
    return res.data;
  } catch (error) {
    console.log("Something went wrong");
  }
};

export const deleteExperience = async (id: string) => {
  try {
    const res = await http.delete(`/student/delete-experience/${id}`);
    return res.data;
  } catch (error) {
    console.log("Something went wrong");
  }
};

export const getExperience = async () => {
  try {
    const res = await http.get("/student/get-experience");
    return res.data;
  } catch (error) {
    console.log("Something went wrong");
  }
};

export const uploadFile = async (file: any) => {
  const data = new FormData();
  data.append("file", file);

  try {
    const res = await http.post("/upload", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    console.log("Something went wrong");
  }
};

export const downloadResume = async (file_name: string) => {
  try {
    const res = await http.get("/download/resume", { responseType: "blob" });
    const href = URL.createObjectURL(res.data);

    // create "a" HTML element with href to file & click
    const link = document.createElement("a");
    link.href = href;
    link.setAttribute("download", `${file_name}.pdf`); //or any other extension
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  } catch (error) {
    console.log("Something went wrong");
  }
};

export const saveAvatar = async (url: string) => {
  try {
    const res = await http.patch("/save-avatar", { url });
    return res.data;
  } catch (error) {
    console.log("Something went wrong");
  }
};

export const changePassword = async (data: TypePasswords) => {
  try {
    const res = await http.patch("/student/change-password", data);
    return res.data;
  } catch (error) {
    console.log("Something went wrong");
  }
};
