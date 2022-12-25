export interface UserLoginInfo {
  email: string;
  password: string;
}

export const userLoginInfoschema = {
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
};
