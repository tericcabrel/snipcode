import { Snippet } from '@sharingan/database';

import CreateSessionDto from '../../../../src/snippets/dtos/create-snippet-dto';
import { generateTestId } from '../../../setup/test-utils';

describe('Test Create Snippet DTO', () => {
  it('should return a valid snippet', () => {
    const folderId = generateTestId();
    const userId = generateTestId();

    // GIVEN
    const dto = new CreateSessionDto({
      content: 'import React from "react";\n\nexport const App = () => {\n\n\treturn(\n\t\t<div>Hello</div>\n\t);\n};',
      description: 'Basic react component',
      folderId,
      language: 'tsx',
      lineHighlight: null,
      name: 'app.tsx',
      theme: 'github-dark',
      userId,
      visibility: 'public',
    });

    // WHEN
    const folder = dto.toSnippet();

    // THEN
    expect(folder).toMatchObject<Snippet>({
      content: 'import React from "react";\n\nexport const App = () => {\n\n\treturn(\n\t\t<div>Hello</div>\n\t);\n};',
      createdAt: expect.any(Date),
      description: 'Basic react component',
      folderId,
      id: expect.any(String),
      language: 'tsx',
      lineHighlight: null,
      name: 'app.tsx',
      size: expect.any(Number),
      theme: 'github-dark',
      updatedAt: expect.any(Date),
      userId,
      visibility: 'public',
    });
  });
});
