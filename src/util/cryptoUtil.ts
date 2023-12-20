import CryptoJS from 'crypto-js';

// Convert hex to byte array and then to Base64
const hexToBytes = (hexString:any) => {
  const bytes = new Uint8Array(Math.ceil(hexString.length / 2));
  for (let i = 0, j = 0; i < hexString.length; i += 2, j++) {
    bytes[j] = parseInt(hexString.substr(i, 2), 16);
  }
  return bytes;
};

const bytesToBase64 = (bytes:any) => {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

// Assuming KEY and IV are provided as hex strings in environment variables
const keyBase64 = bytesToBase64(hexToBytes(process.env.REACT_APP_KEY || ''));
const ivBase64 = bytesToBase64(hexToBytes(process.env.REACT_APP_IV || ''));

const key = CryptoJS.enc.Base64.parse(keyBase64);
const iv = CryptoJS.enc.Base64.parse(ivBase64);

export const encrypt = (text:any) => {
  const encrypted = CryptoJS.AES.encrypt(text, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
};

export const decrypt = (ciphertext:any) => {
  const decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};