"use server";

import { BasketItem } from "@/store/store";

export type Metadata = {
  orderNumebr: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
};

export type GroupedBasketItem = {
  product: BasketItem["product"];
  quantity: number;
};

export async function createCheckoutSession(
  items: GroupedBasketItem[],
  metadata: Metadata
): Promise<string> {
  try {
    const itemsWithoutPrice = items.filter((item) => !item.product.price);
    if (itemsWithoutPrice.length > 0) {
      throw new Error("Some items do not have any price. Cannot give you for free!");
    }

    // 🧪 Simulate checkout session creation
    // Replace this with actual logic (e.g., Stripe or custom logic)
    const checkoutURL = `https://checkout.example.com/session/${metadata.orderNumebr}`;

    // ✅ Return the URL
    return checkoutURL;

  } catch (error) {
    console.log("Error while creating checkout session ---> ", error);
    throw error;
  }
}
