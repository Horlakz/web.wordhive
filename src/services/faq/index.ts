import { Client } from "../apiClient";

export interface FaqData {
  question: string;
  answer: string;
}

export class FaqService extends Client {
  constructor() {
    super("/faq/");
  }

  listFaq() {
    return this.get("");
  }

  createFaq(data: FaqData) {
    return this.post<FaqData>("", data);
  }

  updateFaq(id: string, data: FaqData) {
    return this.patch<FaqData>(id, data);
  }

  deleteFaq(id: string) {
    return this.delete(id);
  }
}
