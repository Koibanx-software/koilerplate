import { z } from "zod";

export const USER_ROLES = ["cashier", "viewer", "admin"] as const;

//User
export const UserSchema = z.object({
  id: z.string().default(""),
  name: z.string({ required_error: "name requerido" }),
  lastName: z.string({ required_error: "lastName requerido" }),
  email: z.string({ required_error: "email requerido" }).email(),
  role: z
    .enum(USER_ROLES, { required_error: "role requerido" })
    .default("viewer"),
  isTermsAcepted: z.boolean({ required_error: "isTermsAcepted requerido" }),
  isDeleted: z
    .boolean({ required_error: "isTermsAcepted requerido" })
    .default(false),
});
export type User = z.infer<typeof UserSchema>;

//create
export const CreateUserSchema = UserSchema.omit({
  id: true,
  isDeleted: true,
});

export type CreateUser = z.infer<typeof CreateUserSchema>;

// update
export const UpdateUserSchema = UserSchema.extend({
  id: z.string({ required_error: "id requerido" }),
});

export type UpdateUser = z.infer<typeof UpdateUserSchema>;
