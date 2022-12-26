/**
 * @swagger
 * components:
 *   schemas:
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: User's email
 *         password:
 *           type: string
 *           description: User's password
 *       example:
 *         email: myemail@gmail.com
 *         password: mypassword
 */

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
