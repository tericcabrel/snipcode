import { UpdateSnippetInput } from './update-snippet-input';
import { TestHelper } from '../../../../tests/helpers';
import { Snippet } from '../snippet.entity';

describe('Test Update Snippet Input', () => {
  it('should have the right property defined to update the snippet', () => {
    const snippetId = TestHelper.generateTestId();
    const userId = TestHelper.generateTestId();

    const input = new UpdateSnippetInput({
      content:
        'import React from "react";\n\nexport const App = () => {\n\n\treturn(\n\t\t<div>Hello Updated</div>\n\t);\n};',
      contentHighlighted:
        'import React from "react";\n\nexport const App = () => {\n\n\treturn(\n\t\t<div>Hello Updated</div>\n\t);\n}; highlighted',
      creatorId: userId,
      description: 'Basic react component updated',
      language: 'tsx',
      lineHighlight: '[[1, "diff-add"]]',
      name: 'app-updated.tsx',
      snippetId,
      theme: 'one-dark-pro',
      visibility: 'private',
    });

    const folderId = TestHelper.generateTestId();
    const currentSnippet = TestHelper.createTestSnippetInput({
      folderId,
      name: 'app.tsx',
      userId,
      visibility: 'public',
    }).toSnippet();

    const snippetToUpdate = input.toSnippet(currentSnippet);

    const expectedSnippet: Snippet = {
      content:
        'import React from "react";\n\nexport const App = () => {\n\n\treturn(\n\t\t<div>Hello Updated</div>\n\t);\n};',
      contentHtml:
        'import React from "react";\n\nexport const App = () => {\n\n\treturn(\n\t\t<div>Hello Updated</div>\n\t);\n}; highlighted',
      createdAt: currentSnippet.createdAt,
      description: 'Basic react component updated',
      folderId: snippetToUpdate.folderId,
      id: currentSnippet.id,
      language: 'tsx',
      lineHighlight: '[[1, "diff-add"]]',
      name: 'app-updated.tsx',
      size: expect.any(Number),
      theme: 'one-dark-pro',
      updatedAt: currentSnippet.updatedAt,
      userId,
      visibility: 'private',
    };

    expect(snippetToUpdate).toMatchObject(expectedSnippet);
  });
});
