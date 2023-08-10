export interface Roles {
  name: string;
  app: string;
}
export interface AuthUser {
  id: string;
  username: string;
  roles: Roles[];
  createdAt: string;
  updatedAt: string;
}
export interface AccessToken {
  jwt: string;
  expiration: number;
  refresh: string;
  refreshExpiration: number;
}

//dto
export interface CreateAuthUser {
  username: string;
  password: string;
  roleName: string;
  email?: string;
}

export interface Auth {
  username: string;
  password: string;
}

export interface UpdateAuthUser extends Auth {}
