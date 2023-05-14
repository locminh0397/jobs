import * as crypto from 'crypto-js';

export function encrypt(text: string) {
  try {
    const result = crypto.AES.encrypt(
      JSON.stringify(text),
      process.env.CRYPTO_SECRET_KEY,
    ).toString();
    return result;
  } catch (error) {
    return error;
  }
}

export function decrypt(text: string) {
  try {
    const result = JSON.parse(
      crypto.AES.decrypt(text, process.env.CRYPTO_SECRET_KEY).toString(
        crypto.enc.Utf8,
      ),
    );
    return result;
  } catch (error) {
    return error;
  }
}
