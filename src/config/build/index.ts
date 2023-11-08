import { AuthSDK } from "@koibanx/auth-sdk";
import BuildSdk, { BuildSDK } from "@koibanx/build-sdk";
import { CryptoCheckoutSDK } from "@koibanx/crypto-checkout-sdk";
import { NotificationAPI } from "@koibanx/notification-sdk";
import { ILogger } from "config/logger/Logger";

//TODO: hacer mejor interaccion con las vaiables
export let buildConfig: { apiKey: string; secret: string };
export let buildSdk: BuildSDK;
export let cryptoCheckoutSdk: CryptoCheckoutSDK;
export let authSdk: AuthSDK;
export let notificationSdk: NotificationAPI;

export async function openBuildConnection(
  apiKey: string,
  secret: string,
  logger: ILogger
): Promise<void> {
  logger.info("start build sdk");
  buildConfig = { apiKey, secret };
  buildSdk = BuildSdk(buildConfig);
  cryptoCheckoutSdk = await buildSdk.cryptoCheckout();
  authSdk = await buildSdk.auth();
  notificationSdk = await buildSdk.notification();
}
