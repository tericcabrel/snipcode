import { generateNoSnippetHtmlContent } from '../../../src/renderer/content/html-generator';

describe('Test HTML generator functions', () => {
  it('should generates html content for a non existing code snippet', () => {
    const WEB_APP_URL = 'https://snipcode.dev';

    const result = generateNoSnippetHtmlContent(WEB_APP_URL);

    expect(result).toMatchInlineSnapshot(`
      "<div class="no-content">
                  <h3>Oops! Snippet not found!</h3>
                  <div>Go to <a href="https://snipcode.dev" target="_blank">Snipcode</a> to ensure it exists and is accessible</div>
                </div>"
    `);
  });
});
