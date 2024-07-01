import axios from "axios";

export default function PaymentIntrigation() {
  const handlePayment = async () => {
    try {
      const result = await axios.post(
        "https://rc-epay.esewa.com.np/api/epay/main/v2/form",
        {
          amount: "100",
          failure_url: "https://google.com",
          product_delivery_charge: "0",
          product_service_charge: "0",
          product_code: "EPAYTEST",
          signature: "YVweM7CgAtZW5tRKica/BIeYFvpSj09AaInsulqNKHk=",
          signed_field_names: "total_amount,transaction_uuid,product_code",
          success_url: "https://esewa.com.np",
          tax_amount: "10",
          total_amount: "110",
          transaction_uuid: "ab14a8f2b02c3",
        }
      );
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div>
      <form
        action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        method="POST"
        className="flex flex-col gap-2 border"
      >
        <input
          type="text"
          id="amount"
          name="amount"
          value="100"
          required
          className="border"
        />
        <input
          type="text"
          id="tax_amount"
          name="tax_amount"
          value="10"
          required
          className="border"
        />
        <input
          type="text"
          id="total_amount"
          name="total_amount"
          value="110"
          required
          className="border"
        />
        <input
          type="text"
          id="transaction_uuid"
          value="ecrtfvy45676b4ertfgyhntrcfvg4"
          name="transaction_uuid"
          required
          className="border"
        />
        <input
          type="text"
          id="product_code"
          name="product_code"
          value="EPAYTEST"
          required
          className="border"
        />
        <input
          type="text"
          id="product_service_charge"
          name="product_service_charge"
          value="0"
          required
          className="border"
        />
        <input
          type="text"
          id="product_delivery_charge"
          name="product_delivery_charge"
          value="0"
          required
          className="border"
        />
        <input
          type="text"
          id="success_url"
          name="success_url"
          value="https://esewa.com.np"
          required
          className="border"
        />
        <input
          type="text"
          id="failure_url"
          name="failure_url"
          value="https://google.com"
          required
          className="border"
        />
        <input
          type="text"
          id="signed_field_names"
          name="signed_field_names"
          value="total_amount=100,transaction_uuid=11-201-13,product_code=EPAYTEST"
          required
          className="border"
        />
        <input
          type="text"
          id="signature"
          name="signature"
          value="ApAgFaOH8B1900oTI62Il9Gvl5C6Y87M0W6a1lRrK10="
          //   required
          className="border"
        />
        <input
          type="text"
          id="sign"
          name="sign"
          value="4Ov7pCI1zIOdwtV2BRMUNjz1upIlT/COTxfLhWvVurE="
          //   required
          className="border"
        />
        <input value="Submit" type="submit" />
      </form>
    </div>
  );
}
