import { ILogger } from "config/logger/Logger";
import { IMongoRepository } from "config/mongo/model.repository";
import { CreateUser, User } from "entities/user.entity";
import { MockProxy, mock } from "jest-mock-extended";
import { IAuthRepository } from "repositories/auth/auth.interface.repository";
import { UserService } from "services/user.service";

describe("Test Users service", () => {
  let mockRepositories: {
    user: MockProxy<IMongoRepository<User>>;
    auth: MockProxy<IAuthRepository>;
  };
  let userService: UserService;
  beforeAll(() => {
    mockRepositories = {
      user: mock<IMongoRepository<User>>(),
      auth: mock<IAuthRepository>(),
    };
    userService = new UserService(mock<ILogger>(), mockRepositories);
  });
  it("deberia de crear el usuario", async () => {
    const user: CreateUser = {
      name: "test",
      lastName: "test",
      email: "test@test.com",
      role: "admin",
      isTermsAcepted: true,
    };
    mockRepositories.user.create.mockResolvedValue({
      ...user,
      id: "1234",
      isDeleted: false,
    });
    const userCreated = await userService.create(user);
    expect(userCreated).toEqual({ ...user, id: "1234", isDeleted: false });
  });
});
