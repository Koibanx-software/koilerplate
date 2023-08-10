import { openBuildConnection } from "adapters/config/build";
import { CheckoutRepository } from "adapters/repositories/checkout.build.repository";
import { configVars } from "config";
import { ICheckoutRepository } from "core/repositories/checkout.repository";

jest.useRealTimers();

describe("test Checkout repository", () => {
  const logger = configVars.baseLogger;
  let buildCheckout: ICheckoutRepository;
  let account = "";
  let orderId = "";
  beforeAll(async () => {
    await openBuildConnection(
      configVars.build.apiKey,
      configVars.build.secret,
      logger
    );
    buildCheckout = new CheckoutRepository(logger, configVars);
  });
  test("debe crear wallet", async () => {
    account = await buildCheckout.createAccount("algo");
    expect(account).toBeDefined();
  }, 40000);
  test("crear order", async () => {
    orderId = await buildCheckout.createOrder("algo", 5, account);
    expect(orderId).toBeDefined();
  }, 25000);
  test("get order", async () => {
    const order = await buildCheckout.getOrder(orderId);
    expect(order).toBeDefined();
  });
  it("should fails for inexistent order", async () => {
    await expect(
      buildCheckout.getOrder("64712155f44abf4535c3acc5")
    ).rejects.toThrow(Error);
  });
});
