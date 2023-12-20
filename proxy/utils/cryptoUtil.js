const CryptoJS = require('crypto-js');

// Convert hex to base64
const hexToBase64 = (hexString) => Buffer.from(hexString, 'hex').toString('base64');

// Assuming KEY and IV are provided as hex strings in environment variables
const base64Key = hexToBase64(process.env.KEY || '');
const base64IV = hexToBase64(process.env.IV || '');

const key = CryptoJS.enc.Base64.parse(base64Key);
const iv = CryptoJS.enc.Base64.parse(base64IV);

const encrypt = (text) => {
  const encrypted = CryptoJS.AES.encrypt(text, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
};

const decrypt = (ciphertext) => {
  
  const decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};

module.exports = { encrypt, decrypt };