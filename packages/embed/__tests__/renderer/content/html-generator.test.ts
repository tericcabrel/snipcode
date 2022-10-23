import { generateNoSnippetHtmlContent } from '../../../src/renderer/content/html-generator';

describe('Test HTML generator functions', () => {
  it.only('should generates html content for a non existing code snippet', () => {
    // GIVEN
    const WEB_APP_URL = 'https://sharingan.dev';

    // WHEN
    const result = generateNoSnippetHtmlContent(WEB_APP_URL);

    // THEN
    expect(result).toMatchInlineSnapshot(`
      "<div class="no-content">
                  <h3>Oops! Snippet not found!</h3>
                  <div>Go to <a href="https://sharingan.dev" target="_blank">Sharingan</a> to ensure it exists and is accessible</div>
                </div>"
    `);
  });
});
