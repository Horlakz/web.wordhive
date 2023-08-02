import { Client } from "../apiClient";

export interface OrderData {
  serviceId: string;
  serviceQuality: string;
  serviceVolume: string;
}

export class OrderService extends Client {
  constructor() {
    super("/order/");
  }

  listOrder() {
    return this.get("");
  }

  createOrder(data: OrderData) {
    return this.post<OrderData>("", data);
  }

  verifyOrder(payment_reference: string) {
    return this.get(`verify/${payment_reference}`);
  }
}
