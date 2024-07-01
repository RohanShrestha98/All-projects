import axios from "axios";

let myKey = {
  // replace this key with yours
  publicTestKey: "test_public_key_6343d9fa5c954ba0a59bdbc76500ceee",
  secretKey: "qwerty",
};

let khaltiConfig = {
  publicKey: myKey.publicTestKey,
  productIdentity: "123766",
  productName: "Ebidhya",
  productUrl: "http://localhost:5173",
  eventHandler: {
    onSuccess(payload) {
      // hit merchant api for initiating verfication
      console.log(payload, "payload");
      let data = {
        token: payload.token,
        amount: payload.amount,
      };

      axios
        .get(
          `https://localhost:5173/khalti/${data.token}/${data.amount}/${myKey.secretKey}`
        )
        .then((response) => {
          console.log(response.data, "response");
        })
        .catch((error) => {
          console.log(error, "error");
        });
    },
    // onError handler is optional
    onError(error) {
      // handle errors
      console.log(error, "error");
    },
    onClose() {
      console.log("widget is closing");
    },
  },
  paymentPreference: [
    "KHALTI",
    "EBANKING",
    "MOBILE_BANKING",
    "CONNECT_IPS",
    "SCT",
  ],
};

export default khaltiConfig;
