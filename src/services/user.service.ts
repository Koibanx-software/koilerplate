import { ILogger } from "config/logger/Logger";
import { CreateUser, UpdateUser } from "entities/user.entity";
import { Repositories } from "repositories";
import { PaginatedParams } from "utils/Pagination";

export class UserService {
  constructor(
    private readonly logger: ILogger,
    private readonly repositories: Repositories
  ) {}

  async create(user: CreateUser) {
    const log = this.logger.child({ function: "save" });
    user.role = "admin";
    const newUser = await this.repositories.user.create({
      ...user,
    });
    await this.repositories.auth.createUser({
      username: newUser.id,
      password: "123",
      email: user.email,
      roleName: user.role,
    });

    return newUser;
  }

  getAll(options: PaginatedParams) {
    const log = this.logger.child({ function: "getAll" });
    log.info("get users");
    return this.repositories.user.find(options.page, options.limit);
  }

  async find(criteria: object) {
    const log = this.logger.child({ function: "find" });
    log.info("find user");
    const user = await this.repositories.user.findOne(criteria);
    return user;
  }

  async update(data: UpdateUser) {
    const log = this.logger.child({ function: "update" });
    log.info({ data }, "updating user");
    return this.repositories.user.update({ _id: data.id }, data);
  }

  async remove(id: string) {
    const log = this.logger.child({ function: "remove" });
    log.info({ id }, "remove");
    await this.repositories.user.findOne({ _id: id });
    await Promise.all([
      this.repositories.user.delete({ _id: id }),
      this.repositories.auth.deleteUser(id),
    ]);
  }
}
