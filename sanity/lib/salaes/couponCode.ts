export const COUPON_CODES = {
    ENDSEM: "ENDSEM",
    "6966": "6966",
  } as const;
  
  export type CouponCode = keyof typeof COUPON_CODES; // "ENDSEM" | "6966"
  