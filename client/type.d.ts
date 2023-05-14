export type TypeUserSignup = {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
};
export type TypeUserSignin = {
  email?: string;
  password?: string;
};

export class TypeGoogleLogin {
  id: string;
  name: string;
  email: string;
  image: string;
}

export type TypeUser = {
  address: string;
  avatar_url: string;
  city: string;
  email: string;
  resume: string;
  full_name: string;
  id: string;
  industry: string;
  phone: string;
  role: string;
  state: string;
  updated_at: string;
  created_at: string;
};

export type TypeStudentForm = {
  full_name: string;
  phone: string;
  city: string;
  state: string;
  address: string;
  industry: string;
};

export type TypeEducation = {
  school_name: string;
  start_year: string;
  end_year: string;
  gpa_score: number;
};

export type TypeExperienceForm = {
  company_name: string;
  started_at: string;
  end_at: string;
  level: string;
};

export type TypeListEducation = {
  id: string;
  user_id: string;
  school_name: string;
  start_year: string;
  end_year: string;
  gpa_score: number;
  created_at: string;
  updated_at: string;
};
export type TypeListExperience = {
  id: string;
  user_id: string;
  company_name: string;
  started_at: string;
  end_at: string;
  level: string;
  created_at: string;
  updated_at: string;
};

declare module "next-auth" {
  interface Session {
    user: {
      access_token: string;
      full_name: string;
      refresh_token: string;
      role: string;
      avatar: string;
      email: string;
    };
  }
}

export type TypePasswords = {
  old_password: string;
  new_password: string;
  confirm_password: string;
};
