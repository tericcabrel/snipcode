import {
  addWhitespaceForEmptyLine,
  generateLineHighlightOptions,
  parseHTMLSnippetCode,
} from '../../../src/renderer/content/utils';

describe('Test utils functions', () => {
  describe('Test addWhitespaceForEmptyLine()', () => {
    it('should create not whitespace for a simple span tag', () => {
      const line = `<span></span>`;

      const result = addWhitespaceForEmptyLine(line);

      expect(result).toEqual(`<span></span>`);
    });

    it('should create whitespace for a code line', () => {
      const line = `<span class="line"></span>`;

      const result = addWhitespaceForEmptyLine(line);

      expect(result).toEqual(`<span class="line">&nbsp;&nbsp;</span>`);
    });

    it('should create whitespace for a code line with highlight', () => {
      const line = `<span class="line line-diff-add"></span>`;

      const result = addWhitespaceForEmptyLine(line);

      expect(result).toEqual(`<span class="line line-diff-add">&nbsp;&nbsp;</span>`);
    });
  });

  describe('Test generateLineHighlightOptions()', () => {
    it('should generate no line highlight options from a null string', () => {
      const lineHighlight: string | null = null;

      const result = generateLineHighlightOptions(lineHighlight);

      expect(result).toMatchObject([]);
    });

    it('should generate no line highlight options from an empty string', () => {
      const lineHighlight = `[]`;

      const result = generateLineHighlightOptions(lineHighlight);

      expect(result).toMatchObject([]);
    });

    it('should generate line highlight options from string', () => {
      const lineHighlight = `[[3,"delete"],[6,"blur"],[7,"add"]]`;

      const result = generateLineHighlightOptions(lineHighlight);

      const expectedResult = [
        { classes: ['line-diff line-diff-delete'], line: 3 },
        { classes: ['line-diff line-diff-blur'], line: 6 },
        { classes: ['line-diff line-diff-add'], line: 7 },
      ];

      expect(result).toMatchObject(expectedResult);
    });
  });

  describe('Test parseHTMLSnippetCode()', () => {
    it('should parse html snippet code', () => {
      const htmlCode = `<pre class="shiki" style="background-color: #ffffff"><span class="line">line code 1</span>\n<span class="line"></span>\n<span class="line">line code 3</span></pre>`;

      const result = parseHTMLSnippetCode(htmlCode);

      expect(result).toEqual(
        `<span class='line-number'>1</span><span class="line">line code 1</span>\n<span class='line-number'>2</span><span class="line">&nbsp;&nbsp;</span>\n<span class='line-number'>3</span><span class="line">line code 3</span>`,
      );
    });
  });
});
