import { useState } from "react";

export const generateRandomPassword = () => {
  const [randomPassword, setRandomPassword] = useState("");
  const passwordLength = 12; // Adjust the length as needed

  const handleRandomPasswordGenerator = () => {
    const getRandomInt = max => {
      return Math.floor(Math.random() * Math.floor(max));
    };

    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numericChars = "0123456789";
    const specialChars = "@#$";

    const allChars = lowercaseChars + uppercaseChars + numericChars + specialChars;

    let password = "";

    // Ensure at least one character from each character set
    password += lowercaseChars[getRandomInt(lowercaseChars.length)];
    password += uppercaseChars[getRandomInt(uppercaseChars.length)];
    password += numericChars[getRandomInt(numericChars.length)];
    password += specialChars[getRandomInt(specialChars.length)];

    // Generate the remaining characters
    for (let i = password.length; i < passwordLength; i++) {
      const randomIndex = getRandomInt(allChars.length);
      password += allChars[randomIndex];
    }

    // Shuffle the password characters
    password = password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    setRandomPassword(password);
  };

  return { randomPassword, setRandomPassword, handleRandomPasswordGenerator };
};
