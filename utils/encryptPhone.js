const CryptoJS = require("crypto-js");

const encryptPhone = (phone) => CryptoJS.AES.encrypt(phone, process.env.PHONE_SECRET).toString();


const decryptPhone = (encrypted) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encrypted, process.env.PHONE_SECRET);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      //console.error("Error decrypting phone:", error.message, encrypted);
      return "Invalid Data";
    }
  };
  

module.exports = { encryptPhone, decryptPhone };
