import { Client } from "../apiClient";

export interface OrderData {
  serviceId: string;
  serviceQuality: string;
  serviceVolume: string;
  user?: { fullname: string; email: string };
  service?: { title: string };
}

export class OrderService extends Client {
  constructor() {
    super("/order/");
  }

  listOrder() {
    return this.get("");
  }

  listAllOrders() {
    return this.get("all");
  }

  createOrder(data: OrderData) {
    return this.post<OrderData>("", data);
  }

  verifyOrder(payment_reference: string) {
    return this.get(`verify/${payment_reference}`);
  }

  viewOrder(reference: string) {
    return this.get(reference);
  }

  getUserOrders(id: string) {
    return this.get("user/" + id);
  }
}
