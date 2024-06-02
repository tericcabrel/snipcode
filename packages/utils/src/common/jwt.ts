import jwt, { JwtPayload } from 'jsonwebtoken';

type GenerateJwtInput<Payload extends JwtPayload> = { expiresIn: string; payload: Payload; secret: string };

type VerifyJwtInput = { secret: string; token: string };

export const generateJwtToken = <Payload extends JwtPayload>({
  expiresIn,
  payload,
  secret,
}: GenerateJwtInput<Payload>): string => {
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyJwtToken = <T extends JwtPayload>({ secret, token }: VerifyJwtInput): T => {
  return jwt.verify(token, secret) as T;
};
