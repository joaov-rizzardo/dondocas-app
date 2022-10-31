import CryptoJS from "crypto-js";

export function encryptValue(value) {
    
    return CryptoJS.AES.encrypt(value, process.env.REACT_APP_SECRET).toString()
}

export function decryptValue(value) {
    const bytes = CryptoJS.AES.decrypt(value, process.env.REACT_APP_SECRET);

    return bytes.toString(CryptoJS.enc.Utf8)
}