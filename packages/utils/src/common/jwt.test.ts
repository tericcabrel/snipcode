import { generateJwtToken, verifyJwtToken } from './jwt';

describe('JWT utility functions', () => {
  const payload = { name: 'John Doe' };
  const secret = 'your-256-bit-secret';
  const expiresIn = '1h';

  it('should generate a JWT token', () => {
    const token = generateJwtToken({ expiresIn, payload, secret });

    expect(typeof token).toBe('string');
  });

  it('should verify a JWT token', () => {
    const token = generateJwtToken({ expiresIn, payload, secret });
    const decodedPayload = verifyJwtToken({ secret, token });

    expect(decodedPayload).toEqual(expect.objectContaining({ name: 'John Doe' }));
  });
});
