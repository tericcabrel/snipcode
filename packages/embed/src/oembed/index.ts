type Args = {
  snippet: {
    id: string;
    name: string;
  };
  snippetRendererURL: string;
  webAppURL: string;
};

type Result = {
  height: number;
  html: string;
  provider_name: string;
  provider_url: string;
  thumbnail_height: string;
  thumbnail_url: string;
  thumbnail_width: string;
  title: string;
  type: string;
  version: string;
  width: number;
};

export const generateOembedMetadata = ({ snippet, snippetRendererURL, webAppURL }: Args): Result => {
  const embedUrl = `${snippetRendererURL}/snippets/${snippet.id}`;

  return {
    height: 500,
    html: `<iframe width="750" height="500" src="${embedUrl}" style="width:750px; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>`,
    provider_name: 'Snipcode',
    provider_url: webAppURL,
    thumbnail_height: '720',
    thumbnail_url: `${webAppURL}/assets/og.png`,
    thumbnail_width: '1280',
    title: snippet.name,
    type: 'rich',
    version: '1.0',
    width: 750,
  };
};
