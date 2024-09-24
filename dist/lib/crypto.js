"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const crypto = __importStar(require("crypto"));
// algorithm - AES 256 GCM Mode
const algorithm = 'aes-256-gcm';
// iterations: It must be a number and should be set as high as possible.
// number of iterations - the value of 2145 is randomly chosen
const iterations = 2145;
// keylen: It is the key of the required byte length and it is of type number.
// derive encryption key: 32 byte key length
const keylen = 32;
// digest: It is a digest algorithm of string type.
const digest = 'sha512';
function encrypt(data, secretKey) {
    // constant to encrypt the data
    const inputEncoding = 'utf8';
    const outputEncoding = 'base64';
    // random initialization vector
    const iv = crypto.randomBytes(12);
    // random salt
    const salt = crypto.randomBytes(16);
    // The method gives an asynchronous Password-Based Key Derivation
    const key = crypto.pbkdf2Sync(secretKey, salt, iterations, keylen, digest);
    // create a Cipher object, with the stated algorithm, key and initialization vector (iv).
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    // create a Cipher object, with the stated algorithm, key and initialization vector (iv).
    const enc1 = cipher.update(data, inputEncoding);
    const enc2 = cipher.final();
    // extract the auth tag
    const tag = cipher.getAuthTag();
    // concat the encrypted result with iv, salt, and tag
    const encryptedData = Buffer.concat([salt, iv, enc1, enc2, tag]).toString(outputEncoding);
    // return the result
    return encryptedData;
}
exports.encrypt = encrypt;
function decrypt(data, secretKey) {
    // constant to decrypt the data
    const inputEncoding = 'base64';
    const outputEncoding = 'utf8';
    // Create a Buffer from the input data
    const bufferData = Buffer.from(data, inputEncoding);
    // Extract salt from encrypted data
    const salt = bufferData.subarray(0, 16);
    // Extract IV from encrypted data
    const iv = bufferData.subarray(16, 28);
    // Extract encrypted text from encrypted data
    const encText = bufferData.subarray(28, bufferData.length - 16);
    // Extract auth tag from encrypted data
    const tag = bufferData.subarray(bufferData.length - 16);
    // Derive key using; 32 byte key length
    const key = crypto.pbkdf2Sync(secretKey, salt, iterations, keylen, digest);
    // AES 256 GCM Mode
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    // Set the auth tag
    decipher.setAuthTag(tag);
    // Update the decipher with the encrypted text
    let decryptedBuffer = decipher.update(encText);
    // Finalize the decipher and get the remaining data
    decryptedBuffer = Buffer.concat([decryptedBuffer, decipher.final()]);
    // Convert the final decrypted Buffer to a string
    return decryptedBuffer.toString(outputEncoding);
}
exports.decrypt = decrypt;
