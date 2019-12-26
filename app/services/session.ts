import jwt from 'jwt-simple';

import config from '../../config';

const SECRET: string = config.common.session.secret;

export const HEADER_NAME = config.common.session.header_name;

export function encode(toEncode: string): string {
  return jwt.encode(toEncode, SECRET);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function decode<T>(toDecode: string): T {
  return jwt.decode(toDecode, SECRET);
}

export default {
  encode,
  decode
};
