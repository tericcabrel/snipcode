import { generateOembedMetadata } from '../../src/oembed';

describe('Test Generate Oembed metadata', () => {
  it('should generate Oembed metadata for a code snippet', () => {
    // GIVEN
    const snippet = { id: 'snippet_id', name: 'snippet-name.java' };
    const SNIPPET_RENDERER_URL = 'https://embed.snipcode.dev';
    const WEB_APP_URL = 'https://snipcode.dev';

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
        "html": "<iframe width="750" height="500" src="https://embed.snipcode.dev/snippets/snippet_id" style="width:750px; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>",
        "provider_name": "Snipcode",
        "provider_url": "https://snipcode.dev",
        "thumbnail_height": "720",
        "thumbnail_url": "https://snipcode.dev/assets/og.png",
        "thumbnail_width": "1280",
        "title": "snippet-name.java",
        "type": "rich",
        "version": "1.0",
        "width": 750,
      }
    `);
  });
});
