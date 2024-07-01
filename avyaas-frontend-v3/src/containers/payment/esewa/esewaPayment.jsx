import CryptoJS from "crypto-js";
import Cookies from "universal-cookie";
import { useModuleStore } from "../../../store/useModuleStore";
import { encryptData } from "../../../utils/crypto";

const path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

const EsewaPayment = ({ selectedPackage, price, txAmt }) => {
  const { currentModule } = useModuleStore();
  const cookies = new Cookies();
  cookies.set("selectedPackage", encryptData(selectedPackage));
  cookies.set("paymentMethod", encryptData("esewa"));
  cookies.set("currentModule", encryptData(currentModule));

  const params = {
    amount: price,
    failure_url: "http://localhost:3001/esewa_payment_failed",
    product_delivery_charge: 0,
    product_service_charge: 0,
    product_code: "EPAYTEST",
    signature: "",
    signed_field_names: "total_amount,transaction_uuid,product_code",
    success_url: "http://localhost:3001/esewa_payment_success",
    tax_amount: txAmt,
    total_amount: price + txAmt,
    transaction_uuid: "",
  };

  const handleEsewaPayment = () => {
    const form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (let key in params) {
      const hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("id", key);
      hiddenField.setAttribute("value", params[key]);
      form.appendChild(hiddenField);
    }
    document.body.appendChild(form);

    var currentTime = new Date();
    var formattedTime =
      currentTime.toISOString().slice(2, 10).replace(/-/g, "") +
      "-" +
      currentTime.getHours() +
      currentTime.getMinutes() +
      currentTime.getSeconds();
    document.getElementById("transaction_uuid").value = formattedTime;

    var total_amount = document.getElementById("total_amount").value;
    var transaction_uuid = document.getElementById("transaction_uuid").value;
    var product_code = document.getElementById("product_code").value;
    var secret = "8gBm/:&EnhH.1/q";

    var hash = CryptoJS.HmacSHA256(
      `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`,
      `${secret}`
    );
    var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    document.getElementById("signature").value = hashInBase64;

    form.submit();
  };
  return handleEsewaPayment;
};

export default EsewaPayment;
