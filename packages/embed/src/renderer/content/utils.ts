export const generateLineHighlightOptions = (lineHighlight: string | null) => {
  const lines = (lineHighlight ? JSON.parse(lineHighlight) : []) as Array<[number, string]>;

  return lines.map(([key, value]) => ({ classes: [`line-diff line-diff-${value}`], line: key }));
};

/**
 * Adding two spaces in an empty span makes it counted as a code line
 *
 * Convert <span class="line"></span> to <span class="line">  </span>
 * Convert <span class="line line-diff-add"></span> to <span class="line line-diff-add">  </span>
 *
 * @param line
 */
export const addWhitespaceForEmptyLine = (line: string) => {
  if (/<span class="line (line-diff-?[a-z ]*)*"><\/span>/.test(line)) {
    const [openingBracket] = line.split('</span>');

    return `${openingBracket}&nbsp;&nbsp;</span>`;
  }

  return line;
};

export const generateRandomString = (strLength: number) => {
  const chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';
  const randomArray = Array.from({ length: strLength }, () => chars[Math.floor(Math.random() * chars.length)]);

  return randomArray.join('');
};
