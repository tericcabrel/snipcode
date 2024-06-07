import { INestApplication } from '@nestjs/common';
import { randEmail, randFullName, randPassword, randWord } from '@ngneat/falso';
import { PrismaService, RoleName } from '@snipcode/domain';
import { generateJwtToken } from '@snipcode/utils';
import request from 'supertest';

type CreateUserInputArgs = {
  email: string;
  isEnabled: boolean;
  name: string;
  password: string | null;
  role: RoleName;
};

type CreateAuthenticatedUserResult = {
  authToken: string;
  user: {
    id: string;
    rootFolderId: string;
  };
};

type CreateFolderArgs = {
  name: string;
  parentId: string;
};

export class TestHelper {
  constructor(
    private readonly app: INestApplication,
    private readonly graphqlEndpoint: string,
  ) {}

  async cleanDatabase(): Promise<void> {
    const prismaService = this.app.get(PrismaService);

    await prismaService.snippet.deleteMany();

    const childFolders = await prismaService.folder.findMany({ where: { NOT: { parent: null } } });

    await prismaService.folder.deleteMany({ where: { id: { in: childFolders.map((folder) => folder.id) } } });

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

  async createAuthenticatedUser(args: Partial<CreateUserInputArgs>): Promise<CreateAuthenticatedUserResult> {
    const createUserInput: Partial<CreateUserInputArgs> = {
      ...args,
      email: args.email ?? randEmail(),
      isEnabled: args.isEnabled ?? true,
      password: args.password ?? randPassword(),
    };

    await this.signupUser(createUserInput);

    const loginQuery = `
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

    const loginResponse = await request(this.app.getHttpServer())
      .post(this.graphqlEndpoint)
      .send({ query: loginQuery, variables });

    const authToken = loginResponse.body.data.loginUser.token;

    const authenticatedUserQuery = `
      query AuthenticatedUser {
        authenticatedUser {
          id
          name
          rootFolder {
            id
            name
          }
        }
      }
    `;

    const authenticatedUserResponse = await request(this.app.getHttpServer())
      .post(this.graphqlEndpoint)
      .set('Authorization', authToken)
      .send({ query: authenticatedUserQuery })
      .expect(200);

    const { authenticatedUser } = authenticatedUserResponse.body.data;

    return {
      authToken,
      user: {
        id: authenticatedUser.id,
        rootFolderId: authenticatedUser.rootFolder.id,
      },
    };
  }

  async createFolder(authToken: string, args: Partial<CreateFolderArgs>): Promise<string> {
    const createFolderInput: Partial<CreateFolderArgs> = {
      ...args,
      name: args.name ?? randWord(),
    };

    const query = `
      mutation CreateFolder($input: CreateFolderInput!) {
        createFolder(input: $input) {
          id
        }
      }
    `;

    const variables = {
      input: {
        name: createFolderInput.name,
        parentId: createFolderInput.parentId,
      },
    };

    const response = await request(this.app.getHttpServer())
      .post(this.graphqlEndpoint)
      .set('Authorization', authToken)
      .send({ query, variables });

    return response.body.data.createFolder.id;
  }
}
