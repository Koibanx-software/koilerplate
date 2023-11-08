import { ILogger } from "config/logger/Logger";
import { CreateUser, UpdateUser } from "entities/user.entity";
import { Repositories } from "repositories";
import { CoreError } from "utils/Errors";
import { PaginatedParams } from "utils/Pagination";

export class UserService {
  constructor(
    private readonly logger: ILogger,
    private readonly repositories: Repositories
  ) {}

  async create(user: CreateUser) {
    const log = this.logger.child({ function: "save" });
    user.role = "admin";
  }

  getAll(options: PaginatedParams) {
    const log = this.logger.child({ function: "getAll" });
    log.info("get users");
  }

  async find(criteria: object) {
    const log = this.logger.child({ function: "find" });
    log.info("find user");
  }

  async update(data: UpdateUser) {
    const log = this.logger.child({ function: "update" });
    log.info({ data }, "updating user");
  }

  async remove(id: string) {
    const log = this.logger.child({ function: "remove" });
    log.info({ id }, "remove");
  }
}
