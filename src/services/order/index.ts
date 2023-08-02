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
}
