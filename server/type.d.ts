export type Tokens = {
  access_token: string;
  refresh_token: string;
};

export type JwtPayload = {
  sub: string;
  email: string;
  role: string;
};

export type JwtPayloadWithRt = JwtPayload & { refreshToken: string };
