export interface ICheckoutRepository {
  createAccount(currency: string): Promise<string>;
  createOrder(
    currency: string,
    amount: number,
    accountId: string
  ): Promise<string>;
  getOrder(orderId: string): Promise<any>;
}
