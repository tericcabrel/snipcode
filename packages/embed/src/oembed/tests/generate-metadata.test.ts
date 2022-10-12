import { generateOembedMetadata } from '../index';

describe('Test Generate Oembed metadata', () => {
  it('should generate Oembed metadata for a code snippet', () => {
    // GIVEN
    const snippet = { id: 'snippet_id', name: 'snippet-name.java' };
    const SNIPPET_RENDERER_URL = 'https://embed.sharingan.dev';
    const WEB_APP_URL = 'https://sharingan.dev';

    // WHEN
    const result = generateOembedMetadata({
      snippet,
      snippetRendererURL: SNIPPET_RENDERER_URL,
      webAppURL: WEB_APP_URL,
    });

    // THEN
    expect(result).toMatchInlineSnapshot(`
      {
        "height": 500,
        "html": "<iframe width="750" height="500" src="https://embed.sharingan.dev/snippets/snippet_id" style="width:750px; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>",
        "provider_name": "Sharingan",
        "provider_url": "https://sharingan.dev",
        "thumbnail_height": "720",
        "thumbnail_url": "https://sharingan.dev/assets/og.png",
        "thumbnail_width": "1280",
        "title": "snippet-name.java",
        "type": "rich",
        "version": "1.0",
        "width": 750,
      }
    `);
  });
});
