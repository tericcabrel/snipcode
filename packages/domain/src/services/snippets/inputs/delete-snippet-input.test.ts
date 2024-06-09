import { DeleteSnippetInput } from './delete-snippet-input';
import { TestHelper } from '../../../../tests/helpers';

describe('Test Delete Snippet Input', () => {
  it('should have the right property defined', () => {
    const snippetId = TestHelper.generateTestId();
    const userId = TestHelper.generateTestId();

    const input = new DeleteSnippetInput({
      creatorId: userId,
      snippetId,
    });

    expect(input.snippetId).toEqual(snippetId);
    expect(input.creatorId).toEqual(userId);
  });
});
