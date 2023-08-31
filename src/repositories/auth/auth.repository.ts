import {
  AccessToken,
  AuthUser,
  CreateAuthUser,
  UpdateAuthUser,
} from "entities/auth.entity";

export interface IAuthRepository {
  updateUser(data: UpdateAuthUser): Promise<AuthUser>;
  createUser(data: CreateAuthUser): Promise<AuthUser>;
  getUser(token: string): Promise<AuthUser>;
  deleteUser(username: string): Promise<AuthUser>;
  hasPermission(
    token: string,
    username: string,
    permissionName: string
  ): Promise<boolean>;
  signIn(username: string, password: string): Promise<AccessToken>;
  createRole(roleName: string): Promise<void>;
  addPermission(roleName: string, permissionName: string): Promise<void>;
  createOTP(username: string): Promise<String>;
}
