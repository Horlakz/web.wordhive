import { Client } from "../apiClient";

interface ContactData {
  fullname: string;
  email: string;
  phone: string;
  country: string;
  message: string;
}

export class ContactService extends Client {
  constructor() {
    super("/contact/");
  }

  listContact() {
    return this.get("");
  }

  createContact(data: ContactData) {
    return this.post<ContactData>("", data);
  }
}
