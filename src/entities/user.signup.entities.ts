export interface UserSignUpInfo {
  email: string;
  password: string;
  retypepassword: string;
}

export const userSignUpInfoschema = {
  email: {
    exists: {
      errorMessage: "You must supply an email.",
    },
  },
  password: {
    exists: {
      errorMessage: "You must supply an password.",
    },
  },
  retypepassword: {
    exists: {
      errorMessage: "You must retype your password.",
    },
  },
};
