import * as crypto from "crypto";
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

// algorithm - AES 256 GCM Mode
const algorithm: crypto.CipherGCMTypes = "aes-256-gcm";

// iterations: It must be a number and should be set as high as possible.
const iterations = 2145;

// keylen: It is the key of the required byte length and it is of type number.
const keylen = 32;

// digest: It is a digest algorithm of string type.
const digest = "sha512";

// Retrieve the secret key from the environment variables
const secretKey = process.env.SECRET_KEY;

if (!secretKey) {
  throw new Error("Secret key is not defined in the .env file");
}

function encrypt(data: string, secretKey: string): string {
  const inputEncoding = "utf8";
  const outputEncoding = "base64";

  // random initialization vector
  const iv = crypto.randomBytes(12);

  // random salt
  const salt = crypto.randomBytes(16);

  // The method gives an asynchronous Password-Based Key Derivation
  const key: Buffer = crypto.pbkdf2Sync(
    secretKey,
    salt,
    iterations,
    keylen,
    digest,
  );

  // create a Cipher object, with the stated algorithm, key and initialization vector (iv).
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  // create a Cipher object, with the stated algorithm, key and initialization vector (iv).
  const enc1 = cipher.update(data, inputEncoding);
  const enc2 = cipher.final();

  // extract the auth tag
  const tag = cipher.getAuthTag();

  // concat the encrypted result with iv, salt, and tag
  const encryptedData = Buffer.concat([salt, iv, enc1, enc2, tag]).toString(
    outputEncoding,
  );

  return encryptedData;
}

function decrypt(data: string, secretKey: string): string {
  const inputEncoding = "base64";
  const outputEncoding = "utf8";

  const bufferData = Buffer.from(data, inputEncoding);

  // Extract salt, IV, encrypted text, and auth tag
  const salt = bufferData.subarray(0, 16);
  const iv = bufferData.subarray(16, 28);
  const encText = bufferData.subarray(28, bufferData.length - 16);
  const tag = bufferData.subarray(bufferData.length - 16);

  // Derive key using; 32 byte key length
  const key = crypto.pbkdf2Sync(secretKey, salt, iterations, keylen, digest);

  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  decipher.setAuthTag(tag);

  let decryptedBuffer = decipher.update(encText);
  decryptedBuffer = Buffer.concat([decryptedBuffer, decipher.final()]);

  return decryptedBuffer.toString(outputEncoding);
}

// Example usage
const myData = "Hello, world!";
const encryptedData = encrypt(myData, secretKey);
console.log("Encrypted:", encryptedData);

const decryptedData = decrypt(encryptedData, secretKey);
console.log("Decrypted:", decryptedData);
