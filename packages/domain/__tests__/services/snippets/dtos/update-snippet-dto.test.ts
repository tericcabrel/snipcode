import { Snippet } from '@snipcode/database';

import { UpdateSnippetDto } from '../../../../index';
import { createTestSnippetDto, generateTestId } from '../../../setup/test-utils';

describe('Test Update Snippet DTO', () => {
  it('should have the right property defined to update the snippet', () => {
    const snippetId = generateTestId();
    const userId = generateTestId();

    const dto = new UpdateSnippetDto({
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

    const folderId = generateTestId();
    const currentSnippet = createTestSnippetDto({
      folderId,
      name: 'app.tsx',
      userId,
      visibility: 'public',
    }).toSnippet();

    const snippetToUpdate = dto.toSnippet(currentSnippet);

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
