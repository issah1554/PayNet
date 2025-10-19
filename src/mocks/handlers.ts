import * as msw from "msw";
import type { Plan, PaymentMethod, TransactionRequest } from "../types/types"
const { rest } = msw;


export const handlers = [
  rest.get("/api/plans", (_req, res, ctx) => {
    const plans: Plan[] = [
      {
        id: "basic",
        name: "Basic",
        description: "Light browsing, email, and messaging",
        price: 1000,
        currency: "TZS",
        duration: "per hour",
        dataLimit: "500 MB"
      },
      {
        id: "standard",
        name: "Standard",
        description: "Streaming, social media, and regular work use",
        price: 5000,
        currency: "TZS",
        duration: "per day",
        dataLimit: "2 GB"
      },
      {
        id: "premium",
        name: "Premium",
        description: "High-speed access with extended data limit",
        price: 5000,
        currency: "TZS",
        duration: "per day",
        dataLimit: "2 GB"
      },
    ];
    return res(ctx.status(200), ctx.json(plans));
  }),

  rest.get("/api/payments/methods", (_req, res, ctx) => {
    const methods: PaymentMethod[] = [
      { id: "mpesa", name: "M-Pesa", status:"enabled" },
      { id: "tigo", name: "Tigo Pesa", status: "enabled" },
    ];
    return res(ctx.status(200), ctx.json(methods));
  }),

  rest.post("/api/payments/transactions", async (req, res, ctx) => {
    const data: TransactionRequest = await req.json();
    return res(
      ctx.status(200),
      ctx.json({
        id: "txn_" + Date.now(),
        status: "success",
        ...data,
      })
    );
  }),
];
