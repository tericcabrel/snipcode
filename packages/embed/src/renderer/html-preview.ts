type Args = {
  code: string;
  color?: string;
  scriptUrl?: string;
  styleUrl: string;
  title: string;
};

const DEFAULT_COLOR = '#22272e';

export const generateHtmlPreview = ({ code, color = DEFAULT_COLOR, scriptUrl, styleUrl, title }: Args) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex,nofollow">
    <title>Sharingan - ${title}</title>
    <link rel="stylesheet" type="text/css" href="${styleUrl}" />
</head>
<body>
    <div class="ctner">
      <div class="ctner-header">
        <div>${title}</div>
        <div>view on <a href="">Sharingan</a></div>
      </div>
      <div class="code-editor-container" style="border: solid 1px ${color}; background-color: ${color}">
        <button id="btn-copy">
          <svg class="ic" id="ic-copy" fill="none" stroke="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
          <svg class="ic hidden" id="ic-copied" fill="none" stroke="#10B981" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </button>
        <pre>${code}</pre>
      </div>
    </div>
    ${scriptUrl ? `<script type="text/javascript" src="${scriptUrl}"></script>` : ''}
</body>
</html>
`;
