import { CreateSnippetInput } from './create-snippet-input';
import { TestHelper } from '../../../../tests/helpers';
import { Snippet } from '../snippet.entity';

describe('Test Create Snippet Input', () => {
  it('should return a valid snippet', () => {
    const folderId = TestHelper.generateTestId();
    const userId = TestHelper.generateTestId();

    const input = new CreateSnippetInput({
      content: 'import React from "react";\n\nexport const App = () => {\n\n\treturn(\n\t\t<div>Hello</div>\n\t);\n};',
      contentHighlighted:
        'import React from "react";\n\nexport const App = () => {\n\n\treturn(\n\t\t<div>Hello</div>\n\t);\n}; highlighted',
      description: 'Basic react component',
      folderId,
      language: 'tsx',
      lineHighlight: null,
      name: 'app.tsx',
      theme: 'github-dark',
      userId,
      visibility: 'public',
    });

    const folder = input.toSnippet();

    expect(folder).toMatchObject<Snippet>({
      content: 'import React from "react";\n\nexport const App = () => {\n\n\treturn(\n\t\t<div>Hello</div>\n\t);\n};',
      contentHtml:
        'import React from "react";\n\nexport const App = () => {\n\n\treturn(\n\t\t<div>Hello</div>\n\t);\n}; highlighted',
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
