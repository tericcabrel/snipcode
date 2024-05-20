import { DeleteSnippetDto } from './delete-snippet-dto';
import { generateTestId } from '../../../tests/helpers';

describe('Test Delete Snippet DTO', () => {
  it('should have the right property defined', () => {
    const snippetId = generateTestId();
    const userId = generateTestId();

    // GIVEN
    const dto = new DeleteSnippetDto({
      creatorId: userId,
      snippetId,
    });

    // WHEN
    // THEN
    expect(dto.snippetId).toEqual(snippetId);
    expect(dto.creatorId).toEqual(userId);
  });
});
