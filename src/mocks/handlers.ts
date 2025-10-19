import * as msw from "msw";
const { rest } = msw;

interface Plan { id: string; name: string; price: number; duration: string }
interface PaymentMethod { id: string; name: string }
interface TransactionRequest { userId: string; planId: string; methodId: string }

export const handlers = [
  rest.get("/api/plans", (_req, res, ctx) => {
    const plans: Plan[] = [
      { id: "basic", name: "Basic", price: 10000, duration: "monthly" },
      { id: "pro", name: "Pro", price: 25000, duration: "monthly" },
    ];
    return res(ctx.status(200), ctx.json(plans));
  }),

  rest.get("/api/payments/methods", (_req, res, ctx) => {
    const methods: PaymentMethod[] = [
      { id: "mpesa", name: "M-Pesa" },
      { id: "tigo", name: "Tigo Pesa" },
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
