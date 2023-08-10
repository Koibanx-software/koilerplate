import { changePassword } from "./auth/changePassword";
import { forgotPassword } from "./auth/forgotPassword";
import { authOTP } from "./auth/otp";
import { profileGet } from "./auth/profile";
import { signIn } from "./auth/signIn";
import { balanceUser } from "./user/balanceUser";
import { userCreate } from "./user/create";
import { updateUser } from "./user/updateUser";
import { DependsOnMethod, Routing } from "express-zod-api";

export const routing: Routing = {
  v1: {
    user: {
      "": new DependsOnMethod({
        post: userCreate,
        put: updateUser,
      }),
      balance: balanceUser,
    },
    auth: {
      otp: authOTP,
      "sign-in": signIn,
      "change-password": changePassword,
      "forgot-password": forgotPassword,
      profile: profileGet,
    },
  },
};
