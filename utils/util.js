const  CryptoJS = require('crypto-js');
//加密key
const key = '201991022019ndit';
//加密偏移值
const piv = 1234567876543210;

const formatTime = (data,type=1) => {
  let date = new Date(data)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return type==1?[year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':'):[year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 加密
 */
const Encrypt = (val) => {
  if(typeof val =='object'){
    val = JSON.stringify(val)
  }
  const message = CryptoJS.enc.Utf8.parse(val);
  const secret_key = CryptoJS.enc.Utf8.parse(key);//key
  const iv = CryptoJS.enc.Utf8.parse(piv);//偏移
  // Encrypt
  const ciphertext = CryptoJS.AES.encrypt(message, secret_key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return CryptoJS.enc.Base64.stringify(ciphertext.ciphertext)
}
/**
 * 解密
 * */
const Decrypt = (val) => {
  const secret_key = CryptoJS.enc.Utf8.parse(key);
  const iv = CryptoJS.enc.Utf8.parse(piv);
  const ciphertext = CryptoJS.AES.decrypt(val, secret_key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return ciphertext.toString(CryptoJS.enc.Utf8)
}
module.exports = {
  formatTime: formatTime,
  encrypt: Encrypt 
}
