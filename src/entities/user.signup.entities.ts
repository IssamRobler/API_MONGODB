/**
 * @swagger
 * components:
 *   schemas:
 *     UserSignUp:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - retypepassword
 *       properties:
 *         email:
 *           type: string
 *           description: User's email
 *         password:
 *           type: string
 *           description: User's password
 *         retypepassword:
 *           type: string
 *           description: User's password retyped
 *       example:
 *         email: myemail@gmail.com
 *         password: mypassword
 *         retypepassword: mypassword
 */

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
