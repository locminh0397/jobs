import { http } from "./http";

export const editCompany = async (company: any) => {
  const res = await http.patch("/company/edit-profile", company);
  return res.data;
};

export const uploadLogo = async (logo: string) => {
  const res = await http.patch("/company/upload-logo", { logo_url: logo });
  return res.data;
};

export const changePassword = async (passwords: any) => {
  const res = await http.patch("/company/edit-password", passwords);
  return res.data;
};

export const downloadResume = async (file_name: string, id: string) => {
  try {
    const res = await http.get(`/download/resume/${id}`, {
      responseType: "blob",
    });
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
