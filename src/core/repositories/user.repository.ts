import { UpdateUser, User } from "core/entities/user.entity";
import { PaginatedParams, PaginatedResult } from "core/utils/Pagination";

export interface IUserRepository {
  save(user: User): Promise<User>;
  update(user: UpdateUser): Promise<User>;
  getByCriteria(criteria: object): Promise<User | null>;
  delete(id: string): Promise<void>;
  getAll(options: PaginatedParams): Promise<PaginatedResult<User>>;
}
