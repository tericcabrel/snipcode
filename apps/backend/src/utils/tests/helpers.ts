import { INestApplication } from '@nestjs/common';
import { randEmail, randFullName, randPassword } from '@ngneat/falso';
import { PrismaService, RoleName } from '@snipcode/domain';
import { generateJwtToken } from '@snipcode/utils';
import request from 'supertest';

export type CreateUserInputArgs = {
  email: string;
  isEnabled: boolean;
  name: string;
  password: string | null;
  role: RoleName;
};
export class TestHelper {
  constructor(
    private readonly app: INestApplication,
    private readonly graphqlEndpoint: string,
  ) {}

  async cleanDatabase(): Promise<void> {
    const prismaService = this.app.get(PrismaService);

    await prismaService.snippet.deleteMany();
    await prismaService.folder.deleteMany();
    await prismaService.session.deleteMany();
    await prismaService.user.deleteMany();
  }

  async signupUser(input: Partial<CreateUserInputArgs>): Promise<string> {
    const query = `
      mutation SignupUser($input: SignupUserInput!) {
        signupUser(input: $input) {
          __typename
          message
          userId
        }
      }
    `;
    const variables = {
      input: {
        email: input.email ?? randEmail(),
        name: input.name ?? randFullName(),
        password: input.password ?? randPassword(),
      },
    };

    const response = await request(this.app.getHttpServer()).post(this.graphqlEndpoint).send({ query, variables });

    if (input.isEnabled) {
      const confirmationToken = generateJwtToken({
        expiresIn: '1h',
        payload: { userId: response.body.data.signupUser.userId },
        secret: process.env.JWT_SECRET,
      });

      const confirmUserQuery = `
        mutation ConfirmUser($token: String!) {
          confirmUser(token: $token) {
            message
          }
        }
      `;

      const confirmUserVariables = {
        token: confirmationToken,
      };

      await request(this.app.getHttpServer())
        .post(this.graphqlEndpoint)
        .send({ query: confirmUserQuery, variables: confirmUserVariables });
    }

    return response.body.data.signupUser.userId;
  }

  async createAuthenticatedUser(input: Partial<CreateUserInputArgs>): Promise<{ authToken: string; userId: string }> {
    const createUserInput: Partial<CreateUserInputArgs> = {
      ...input,
      email: input.email ?? randEmail(),
      isEnabled: input.isEnabled ?? true,
      password: input.password ?? randPassword(),
    };

    const userId = await this.signupUser(createUserInput);

    const query = `
      mutation LoginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
          token
        }
      }
    `;

    const variables = {
      email: createUserInput.email,
      password: createUserInput.password,
    };

    const response = await request(this.app.getHttpServer()).post(this.graphqlEndpoint).send({ query, variables });

    return {
      authToken: response.body.data.loginUser.token,
      userId,
    };
  }
}
