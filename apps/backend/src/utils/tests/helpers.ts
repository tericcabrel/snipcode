import { INestApplication } from '@nestjs/common';
import { randEmail, randFullName, randPassword, randWord } from '@ngneat/falso';
import request from 'supertest';

import { PrismaService, RoleName } from '@snipcode/domain';
import { generateJwtToken } from '@snipcode/utils';

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

type CreateSnippetArgs = {
  folderId: string;
  name: string;
  visibility: 'public' | 'private';
};

export class TestHelper {
  private graphqlEndpoint: string;

  constructor(
    private readonly app: INestApplication,
    graphqlEndpoint?: string,
  ) {
    this.graphqlEndpoint = graphqlEndpoint ?? '/graphql';
  }

  async cleanDatabase(): Promise<void> {
    const prismaService = this.app.get(PrismaService);

    await prismaService.snippet.deleteMany();

    // Recursive relationship between folders makes it hard to delete all folders using folder.deleteMany()
    await prismaService.$executeRaw`SET FOREIGN_KEY_CHECKS=0;`;
    await prismaService.$executeRaw`TRUNCATE TABLE folders;`;
    await prismaService.$executeRaw`SET FOREIGN_KEY_CHECKS=1;`;

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

  async createSnippet(authToken: string, args: Partial<CreateSnippetArgs>): Promise<string> {
    const createSnippetInput: Partial<CreateSnippetArgs> = {
      ...args,
      name: args.name ?? randWord(),
      visibility: args.visibility ?? 'public',
    };

    const query = `
      mutation CreateSnippet($input: CreateSnippetInput!) {
        createSnippet(input: $input) {
          id
        }
      }
    `;

    const variables = {
      input: {
        content: 'const a = 1;',
        contentHighlighted: '<span>const a = 1;</span>',
        description: 'This is a description',
        folderId: createSnippetInput.folderId,
        language: 'javascript',
        lineHighlight: '[]',
        name: createSnippetInput.name,
        theme: 'github-dark-dimmed',
        visibility: createSnippetInput.visibility,
      },
    };

    const response = await request(this.app.getHttpServer())
      .post(this.graphqlEndpoint)
      .set('Authorization', authToken)
      .send({ query, variables });

    return response.body.data.createSnippet.id;
  }

  async getAuthenticatedUser(authToken: string) {
    const authenticatedUserQuery = `
      query AuthenticatedUser {
        authenticatedUser {
          id
          rootFolder {
            id
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
      id: authenticatedUser.id,
      rootFolderId: authenticatedUser.rootFolder.id,
    };
  }
}
