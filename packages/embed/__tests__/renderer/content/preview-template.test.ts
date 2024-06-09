import { Args, generateHTMLPreview } from '../../../src/renderer/content/preview-template';

jest.mock('../../../src/renderer/content/utils', () => {
  return {
    generateRandomString: () => 'random-id',
  };
});

describe('Test generateHTMLPreview()', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should generates the html preview for a code snippet', () => {
    const args: Args = {
      code:
        '<span class="line">export const hashPassword = (password: string): string => {</span>\n' +
        '<span class="line">  const SALT_ROUNDS = 10;</span>\n' +
        '<span class="line"></span>\n' +
        '<span class="line">  return bcrypt.hashSync(password, SALT_ROUNDS);</span>\n' +
        '<span class="line">};</span>',
      color: '#f5f5f5',
      rawCode:
        'export const hashPassword = (password: string): string => {\n' +
        '  const SALT_ROUNDS = 10;\n' +
        '\n' +
        '  return bcrypt.hashSync(password, SALT_ROUNDS);\n' +
        '};',
      scriptUrl: 'https://cdn.com/snipcode/script.js',
      styleUrl: 'https://cdn.com/snipcode/style.css',
      title: 'helpers.ts',
      webAppUrl: 'https://snipcode.dev',
    };

    const result = generateHTMLPreview(args);

    expect(result).toMatchInlineSnapshot(`
      "
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <meta name="robots" content="noindex,nofollow">
              <title>Snipcode - helpers.ts</title>
              <link rel="stylesheet" type="text/css" href="https://cdn.com/snipcode/style.css" />
          </head>
          <body data-id="random-id">
              <div class="ctner">
                <div class="ctner-header">
                  <div>helpers.ts</div>
                  <div>view on <a href="https://snipcode.dev" target="_blank">Snipcode</a></div>
                </div>
                <textarea id="raw-code-random-id" class="hidden" rows="1" cols="1">export const hashPassword = (password: string): string => {
        const SALT_ROUNDS = 10;

        return bcrypt.hashSync(password, SALT_ROUNDS);
      };</textarea>
                <div class="code-editor-container" id="code-random-id" style="border: solid 1px #f5f5f5; background-color: #f5f5f5">
                  <button id="btn-copy-random-id" class="btn-copy hidden" style="">
                    <svg class="ic show" id="ic-copy-random-id" fill="none" stroke="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                    <svg class="ic hidden" id="ic-copied-random-id" fill="none" stroke="#10B981" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </button>
                  <pre><span class="line">export const hashPassword = (password: string): string => {</span>
      <span class="line">  const SALT_ROUNDS = 10;</span>
      <span class="line"></span>
      <span class="line">  return bcrypt.hashSync(password, SALT_ROUNDS);</span>
      <span class="line">};</span></pre>
                </div>
              </div>
              <script type="text/javascript" src="https://cdn.com/snipcode/script.js"></script>
          </body>
          </html>
      "
    `);
  });
});
