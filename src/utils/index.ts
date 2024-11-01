import { encrypt } from '../lib/crypto';

function getEncryptedText<T>(input: T): T | string {
	const APPLY_ENCRYPTED = process.env.APPLY_ENCRYPTED === 'true';
	const { SECRET_KEY } = process.env;

	// Encrypt only if encrypted is enabled and secret key is provided;

	if (APPLY_ENCRYPTED && SECRET_KEY) {
		// convert input to json String  if its not already a string
		const output =
			typeof input === 'string' ? input : JSON.stringify(input);
		return encrypt(output, SECRET_KEY);
	}

	return input;
}

export default getEncryptedText;
