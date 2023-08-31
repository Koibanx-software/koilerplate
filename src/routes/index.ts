import * as auth from "./auth";
import * as user from "./user";
import { DependsOnMethod, Routing } from "express-zod-api";

export const routing: Routing = {
  v1: {
    user: {
      "": new DependsOnMethod({
        post: user.userCreate,
        put: user.updateUser,
      }),
    },
    auth: {
      otp: auth.authOTP,
      "sign-in": auth.signIn,
      "change-password": auth.changePassword,
      "forgot-password": auth.forgotPassword,
      profile: auth.profileGet,
    },
  },
};
