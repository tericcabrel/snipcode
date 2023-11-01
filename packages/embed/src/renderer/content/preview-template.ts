import { generateRandomString } from './utils';

export type Args = {
  code: string;
  color?: string;
  rawCode: string;
  scriptUrl?: string;
  styleUrl: string;
  title: string;
  webAppUrl: string;
};

const DEFAULT_COLOR = '#22272e';

export const generateHTMLPreview = ({
  code,
  color = DEFAULT_COLOR,
  rawCode,
  scriptUrl,
  styleUrl,
  title,
  webAppUrl,
}: Args) => {
  const id = generateRandomString(6);
  const isEmpty = !rawCode;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="robots" content="noindex,nofollow">
        <title>Snipcode - ${title}</title>
        <link rel="stylesheet" type="text/css" href="${styleUrl}" />
    </head>
    <body data-id="${id}">
        <div class="ctner">
          <div class="ctner-header">
            <div>${title}</div>
            <div>view on <a href="${webAppUrl}" target="_blank">Snipcode</a></div>
          </div>
          <textarea id="raw-code-${id}" class="hidden" rows="1" cols="1">${rawCode}</textarea>
          <div class="code-editor-container" id="code-${id}" style="border: solid 1px ${color}; background-color: ${color}">
            <button id="btn-copy-${id}" class="btn-copy hidden" style="${isEmpty ? 'display: none' : ''}">
              <svg class="ic show" id="ic-copy-${id}" fill="none" stroke="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              <svg class="ic hidden" id="ic-copied-${id}" fill="none" stroke="#10B981" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </button>
            ${isEmpty ? `${code}` : `<pre>${code}</pre>`}
          </div>
        </div>
        ${scriptUrl && !isEmpty ? `<script type="text/javascript" src="${scriptUrl}"></script>` : ''}
    </body>
    </html>
`;
};
