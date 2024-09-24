"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("../lib/crypto");
function getEncryptedText(input) {
    const APPLY_ENCRYPTED = process.env.APPLY_ENCRYPTED === 'true';
    const { SECRET_KEY } = process.env;
    // Encrypt only if encrypted is enabled and secret key is provided;
    if (APPLY_ENCRYPTED && SECRET_KEY) {
        // convert input to json String  if its not already a string
        const output = typeof input === 'string' ? input : JSON.stringify(input);
        return crypto_1.encrypt(output, SECRET_KEY);
    }
    return input;
}
exports.default = getEncryptedText;
