import * as msw from "msw";
import type { Plan, BasePaymentMethod, PaymentRequest } from "../types/types";
const { rest } = msw;

// shared mock data
const mockPlans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    description: "Light browsing, email, and messaging",
    price: 1000,
    currency: "TZS",
    duration: "per hour",
    dataLimit: "500 MB",
  },
  {
    id: "standard",
    name: "Standard",
    description: "Streaming, social media, and regular work use",
    price: 5000,
    currency: "TZS",
    duration: "per day",
    dataLimit: "2 GB",
  },
  {
    id: "premium",
    name: "Premium",
    description: "High-speed access with extended data limit",
    price: 10000,
    currency: "TZS",
    duration: "per week",
    dataLimit: "10 GB",
  },
];

const methods: BasePaymentMethod[] = [
  { id: "mpesa", name: "M-Pesa", status: "enabled" },
  { id: "airtelmoney", name: "M-Pesa", status: "enabled" },
  // { id: "halopesa", name: "M-Pesa", status: "disabled" },
  { id: "mixxbyyass", name: "Mixx By Yas", status: "enabled" },
];

export const handlers = [
  rest.get("/api/plans", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockPlans), ctx.delay(3000));
  }),

  rest.get("/api/payments/methods", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(methods));
  }),

  rest.post("/api/payments/initiate", async (req, res, ctx) => {
    const data: PaymentRequest = await req.json();

    // validate plan
    const plan = mockPlans.find((p) => p.id === data.planId);
    if (!plan) return res(ctx.delay(8000), ctx.status(400), ctx.json({ error: "Invalid planId" }));

    // validate phone number
    if (!/^\d{9,15}$/.test(String(data.phoneNumber)))
      return res(ctx.delay(8000), ctx.status(400), ctx.json({ error: "Invalid phone number" }));

    // validate payment method
    const method = methods.find((m) => m.id === String(data.paymentMethod));
    if (!method)
      return res(ctx.delay(8000), ctx.status(400), ctx.json({ error: "Invalid payment method" }));

    // success
    return res(
      ctx.delay(3000),
      ctx.status(200),
      ctx.json({
        id: "pay_" + Date.now(),
        status: "success",
        plan,
        ...data,
      })
    );
  }),

];
