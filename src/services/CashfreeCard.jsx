import { useEffect, useRef } from "react";
import { load } from "@cashfreepayments/cashfree-js";

function V3Card() {
  // refs to hold cashfree & components across renders
  const cashfreeRef = useRef(null);
  const cardComponentRef = useRef(null);
  const cvvComponentRef = useRef(null);
  const cardHolderRef = useRef(null);
  const cardExpiryRef = useRef(null);
  const saveRef = useRef(null);

  const paymentBtn = useRef(null);
  const paymentMessage = useRef(null);

  // Render card fields once
  useEffect(() => {
    let mounted = true;

    const renderCard = async () => {
      try {
        const cashfree = await load({ mode: "sandbox" }); // swap to prod when ready
        if (!mounted) return;

        cashfreeRef.current = cashfree;

        const styleObject = {
          fonts: [{ cssSrc: "https://fonts.googleapis.com/css2?family=Lato" }],
          base: {
            fontSize: "16px",
            fontFamily: "Lato",
            backgroundColor: "#FFFFFF",
            ":focus": {
              border: "1px solid #2361d5",
            },
            border: "1px solid #e6e6e6",
            borderRadius: "6px",
            padding: "14px",
            color: "#000000",
          },
          invalid: {
            color: "#df1b41",
          },
        };

        const cardOptions = {
          values: { placeholder: "Enter Card Number" },
          style: styleObject,
        };
        cardComponentRef.current = cashfree.create("cardNumber", cardOptions);
        cardComponentRef.current.mount("#cardNumber");

        const cvvOptions = { style: styleObject };
        cvvComponentRef.current = cashfree.create("cardCvv", cvvOptions);
        cvvComponentRef.current.mount("#cardCvv");

        const cardHolderOptions = {
          values: { placeholder: "Enter Card Holder Name" },
          style: styleObject,
        };
        cardHolderRef.current = cashfree.create(
          "cardHolder",
          cardHolderOptions
        );
        cardHolderRef.current.mount("#cardHolder");

        const cardExpiryOptions = { style: styleObject };
        cardExpiryRef.current = cashfree.create(
          "cardExpiry",
          cardExpiryOptions
        );
        cardExpiryRef.current.mount("#cardExpiry");

        const saveOptions = {
          values: { label: "Save Card for later" },
          style: styleObject,
        };
        saveRef.current = cashfree.create("savePaymentInstrument", saveOptions);
        saveRef.current.mount("#save");

        // set initial button state
        toggleBtn();

        // wire up change events
        cardExpiryRef.current.on("change", () => toggleBtn());
        cardHolderRef.current.on("change", () => toggleBtn());
        cardComponentRef.current.on("change", (data) => {
          // update cvv length based on card type
          cvvComponentRef.current.update({ cvvLength: data.value.cvvLength });
          toggleBtn();
        });
        cvvComponentRef.current.on("change", () => toggleBtn());
      } catch (err) {
        console.error("Failed to load Cashfree:", err);
        if (paymentMessage.current) {
          paymentMessage.current.textContent = "Failed to load payment SDK.";
        }
      }
    };

    renderCard();

    return () => {
      mounted = false;
      // cleanup mounted components if available
      try {
        cardComponentRef.current?.unmount?.();
        cvvComponentRef.current?.unmount?.();
        cardHolderRef.current?.unmount?.();
        cardExpiryRef.current?.unmount?.();
        saveRef.current?.unmount?.();
      } catch (e) {
        // ignore cleanup errors
      }
    };
    // empty deps -> run once
  }, []);

  const toggleBtn = () => {
    const btn = paymentBtn.current;
    const card = cardComponentRef.current;
    const cvv = cvvComponentRef.current;
    const holder = cardHolderRef.current;
    const expiry = cardExpiryRef.current;

    if (!btn || !card || !cvv || !holder || !expiry) {
      return;
    }

    if (
      expiry.isComplete() &&
      holder.isComplete() &&
      card.isComplete() &&
      cvv.isComplete()
    ) {
      btn.disabled = false;
    } else {
      btn.disabled = true;
    }
  };

  const doPayment = async () => {
    try {
      if (paymentBtn.current) paymentBtn.current.disabled = true;
      if (paymentMessage.current) paymentMessage.current.textContent = "";

      const cf = cashfreeRef.current;
      if (!cf) throw new Error("Payment SDK not loaded");

      const data = await cf.pay({
        paymentMethod: cardComponentRef.current,
        paymentSessionId: "your-payment-session-id", // <-- replace with real session id from your server
        savePaymentInstrument: saveRef.current,
      });

      if (data && data.error) {
        paymentMessage.current.textContent =
          data.error.message || "Payment failed";
      } else {
        // handle success UI (but verify on server via webhook)
        paymentMessage.current.textContent = "Payment processed. Verifying...";
      }
    } catch (err) {
      console.error(err);
      if (paymentMessage.current)
        paymentMessage.current.textContent = err.message || "Payment failed";
    } finally {
      if (paymentBtn.current) paymentBtn.current.disabled = false;
    }
  };

  return (
    <div className="max-w-md w-full p-6 bg-gray-50 rounded-lg shadow-sm m-24">
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Card number
        </label>
        <div
          id="cardNumber"
          className="bg-white rounded-md border border-gray-200 p-3"
        ></div>
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Card holder
        </label>
        <div
          id="cardHolder"
          className="bg-white rounded-md border border-gray-200 p-3"
        ></div>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Expiry
          </label>
          <div
            id="cardExpiry"
            className="bg-white rounded-md border border-gray-200 p-3"
          ></div>
        </div>
        <div className="w-36">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            CVV
          </label>
          <div
            id="cardCvv"
            className="bg-white rounded-md border border-gray-200 p-3"
          ></div>
        </div>
      </div>

      <div className="mb-4">
        <div id="save" className="text-sm text-gray-700"></div>
      </div>

      <button
        type="button"
        id="payNow"
        ref={paymentBtn}
        onClick={doPayment}
        disabled
        className="w-full h-10 flex items-center justify-center rounded-md border border-blue-600 text-blue-600 bg-white hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        Pay Now
      </button>

      <p
        ref={paymentMessage}
        id="paymentMessage"
        className="mt-3 text-sm text-red-600"
      />
    </div>
  );
}

export default V3Card;
