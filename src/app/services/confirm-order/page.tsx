import Link from "next/link";
import { FC } from "react";

import Button from "@/components/common/Button";
import { OrderService } from "@/services/order";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ConfirmServiceOrderPage: FC<Props> = async ({ searchParams }) => {
  const reference = searchParams.reference as string;
  const orderService = new OrderService();

  const { data } = await orderService.verifyOrder(reference);

  const message = {
    success: "Your order has been placed successfully",
    failed:
      "Sorry, your order could not be placed due to payment failure. Please try to check your payment method or contact support if you think this is a mistake.",
  };

  return (
    <main className="py-5 sm:px-20 px-8">
      <section className="flex flex-col center gap-5 sm:p-20 p-10">
        <span className="text-xl text-center text-dark-600 hover:text-secondary default-transition cursor-pointer">
          {data.status == "success" ? message.success : message.failed}
        </span>

        <Link href="/account">
          <Button>Go to Dashboard</Button>
        </Link>
      </section>
    </main>
  );
};

export default ConfirmServiceOrderPage;
