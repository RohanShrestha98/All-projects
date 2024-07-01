import CryptoJS from "crypto-js";
const secretPass = import.meta.env.VITE_CRYPTO_SECRET_KEY;

export const encryptData = (plainText) => {
  const cipherText = CryptoJS.AES.encrypt(
    JSON.stringify(plainText),
    secretPass
  ).toString();
  return cipherText;
};

export const decryptedData = (ciphertext) => {
  const plainText =
    ciphertext &&
    JSON?.parse(
      CryptoJS.AES.decrypt(ciphertext.toString(), secretPass).toString(
        CryptoJS.enc.Utf8
      )
    );
  return plainText;
};

// export const decryptedDataInByte = (ciphertext) => {
//   const decData = CryptoJS?.enc?.Base64?.parse(ciphertext)?.toString(
//     CryptoJS.enc.Utf8
//   );
//   const bytes = CryptoJS.AES.decrypt(decData, secretPass).toString(
//     CryptoJS.enc.Utf8
//   );
//   const bytesParse = JSON.parse(bytes);
//   decryptedData(bytesParse);
// };

export const decryptedDataInByte = (ciphertext) => {
  try {
    if (!ciphertext) {
      throw new Error("Empty ciphertext");
    }
    
    const decData = CryptoJS?.enc?.Base64?.parse(ciphertext)?.toString(
      CryptoJS.enc.Utf8
    );
    
    if (!decData) {
      throw new Error("Decrypted data is empty");
    }
    
    const bytes = CryptoJS.AES.decrypt(decData, secretPass).toString(
      CryptoJS.enc.Utf8
    );

    if (!bytes) {
      throw new Error("Decryption failed");
    }

    const bytesParse = JSON.parse(bytes);
    // Assuming decryptedData is a function to handle the decrypted data
    decryptedData(bytesParse);
  } catch (error) {
    console.error("Decryption error:", error.message);
    // Handle error gracefully, e.g., return a default value or throw the error
  }
};


