import { faker } from "@faker-js/faker";
import { openBuildConnection } from "adapters/config/build";
import { AuthRepository } from "adapters/repositories/auth.build.repository";
import { configVars } from "config";
import { AccessToken } from "core/entities/auth.entity";
import { Roles } from "core/entities/auth.entity";
import { IAuthRepository } from "core/repositories/auth.repository";

describe("test auth repository", () => {
  const logger = configVars.baseLogger;
  let buildAuth: IAuthRepository;
  const username = faker.string.uuid();
  const username1 = faker.string.uuid();
  const email = faker.internet.email();
  const password = faker.internet.password();
  const roleName = "adminTest";
  let session: AccessToken;
  beforeAll(async () => {
    jest.setTimeout(60000);
    await openBuildConnection(
      configVars.build.apiKey,
      configVars.build.secret,
      logger
    );
    buildAuth = new AuthRepository(logger, configVars);
    try {
      await Promise.allSettled([
        buildAuth.createRole(roleName),
        buildAuth.addPermission(roleName, "hasPermission"),
        buildAuth.addPermission(roleName, "test"),
        buildAuth.addPermission(roleName, "getUser"),
      ]);
    } catch (error) {
      logger.info("Role already exists");
    }
    await buildAuth.createUser({
      username,
      password,
      email,
      roleName,
    });
  });
  describe("createUser", () => {
    it("debe crear usuario", async () => {
      const newUser = await buildAuth.createUser({
        username: username1,
        password,
        email,
        roleName,
      });

      expect(newUser.username).toEqual("Crypto checkout v2-" + username1);
    });
  });
  describe("signIn", () => {
    it("deberia poder logearse", async () => {
      session = await buildAuth.signIn(username, password);
      expect(session.jwt).toBeDefined();
    });
    it("deberia fallar logearse", async () => {
      const session = await buildAuth.signIn(username, "badwrongpassword");
      expect(session.jwt).toBeUndefined();
    });
  });
  describe("updateUser", () => {
    it("deberia poder actualizar el password al usuario", async () => {
      await buildAuth.updateUser({
        username,
        password: "test1",
      });
      const session = await buildAuth.signIn(username, "test1");
      expect(session.jwt).toBeDefined();
    });
  });
  describe("hasPermission", () => {
    it("deberia el usuario tener permisos", async () => {
      const hasPermission = await buildAuth.hasPermission(
        session.jwt,
        username,
        "test"
      );

      expect(hasPermission).toBeTruthy();
    });
    it("deberia el usuario no tener permisos", async () => {
      const hasPermission = await buildAuth.hasPermission(
        session.jwt,
        username,
        "nonexistentpermission"
      );

      expect(hasPermission).toBeFalsy();
    });
  });
  describe("deletedUser", () => {
    it("deberia eliminar el usuario de auth", async () => {
      const deletedUser = await buildAuth.deleteUser(username);

      expect("Crypto checkout v2-" + username).toBe(deletedUser.username);
    });
    it("deberia eliminar el username1 de auth", async () => {
      const deletedUser = await buildAuth.deleteUser(username1);

      expect("Crypto checkout v2-" + username1).toBe(deletedUser.username);
    });
  });
  describe("getUser", () => {
    it("deberia asignar el rol correctamente", async () => {
      const getUser = await buildAuth.getUser(session.jwt);
      const roleResult = getUser.roles.find(
        (role: Roles) => role.name == roleName
      );
      expect(roleResult ?? false).toBeTruthy();
    });
  });
  describe("generate otp", () => {
    it("deberia generar un otp", async () => {
      console.log("------------------------------", username1);
      const otp = await buildAuth.createOTP(username1);
      console.log("------------------------------", otp);
      expect(otp).toBeDefined();
    });
  });
});
