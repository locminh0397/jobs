export type TypeEmployerForm = {
  user_name: string;
  password: string;
  confirm_password: string;
  name_company: string;
  email_company: string;
};
export type TypeEmployerSigninForm = {
  user_name: string;
  password: string;
};

export type TypeJobForm = {
  title: string;
  from_salary: number;
  to_salary: number;
  hidden_salary: boolean;
  location: string;
  job_type: string;
  industry: string;
  description: string;
  requirements: string;
};

export type TypeJobEditForm = {
  title?: string;
  from_salary?: number;
  to_salary?: number;
  hidden_salary?: boolean;
  location?: string;
  job_type?: string;
  industry?: string;
  description?: string;
  requirements?: string;
};
