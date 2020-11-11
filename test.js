var CryptoJS = require("crypto-js");
console.log(CryptoJS.HmacSHA1("Message", "Key").toString());
console.log(CryptoJS.HmacSHA1("Message", "Key").toString());

console.log('00', '11');

var encrypted = CryptoJS.AES.encrypt("Message", "Secret Passphrase");

var decrypted = CryptoJS.AES.decrypt("U2FsdGVkX1/DODsllE4hwYlzoHxip/Q5adsdsDPKWZ6bk1gc=", "Secret Passphrase");
console.log('****', encrypted.toString(), decrypted.toString(CryptoJS.enc.Utf8))

console.log(CryptoJS.AES.decrypt('U2FsdGVkX1+7VoROWey9pgMwBgTK3osaRGKhiDxJlMgsz73RCtpuUdKgHu6znpBI', 'ful6fq').toString(CryptoJS.enc.Utf8))