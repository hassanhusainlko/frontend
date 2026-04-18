import { load } from "@cashfreepayments/cashfree-js";

let cashfreeInstance = null;

/**
 * Initialize the Cashfree SDK.
 * Mode is driven by VITE_CASHFREE_MODE env var (default: "sandbox").
 * Set VITE_CASHFREE_MODE=production in your .env for live payments.
 */
export async function initCashfree() {
  const mode = import.meta.env.VITE_CASHFREE_MODE || "sandbox";
  cashfreeInstance = await load({ mode });
  return cashfreeInstance;
}

/**
 * Open Cashfree checkout UI with the given payment session ID.
 * Initializes SDK if not already initialized.
 */
export async function launchCheckout(paymentSessionId) {
  if (!cashfreeInstance) {
    await initCashfree();
  }
  return cashfreeInstance.checkout({
    paymentSessionId,
    redirectTarget: "_self",
  });
}
