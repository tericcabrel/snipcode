import { addWhitespaceForEmptyLine, generateLineHighlightOptions } from '../utils';

describe('Test utils functions', () => {
  describe('Test addWhitespaceForEmptyLine()', () => {
    it('should create not whitespace for a simple span tag', () => {
      // GIVEN
      const line = `<span></span>`;

      // WHEN
      const result = addWhitespaceForEmptyLine(line);
      // THEN

      expect(result).toEqual(`<span></span>`);
    });

    it('should create whitespace for a code line', () => {
      // GIVEN
      const line = `<span class="line"></span>`;

      // WHEN
      const result = addWhitespaceForEmptyLine(line);

      // THEN
      expect(result).toEqual(`<span class="line">&nbsp;&nbsp;</span>`);
    });

    it('should create whitespace for a code line with highlight', () => {
      // GIVEN
      const line = `<span class="line line-diff-add"></span>`;

      // WHEN
      const result = addWhitespaceForEmptyLine(line);
      // THEN

      expect(result).toEqual(`<span class="line line-diff-add">&nbsp;&nbsp;</span>`);
    });
  });

  describe.only('Test generateLineHighlightOptions()', () => {
    it('should generate no line highlight options from a null string', () => {
      // GIVEN
      const lineHighlight: string | null = null;

      // WHEN
      const result = generateLineHighlightOptions(lineHighlight);

      // THEN
      expect(result).toMatchObject([]);
    });

    it('should generate no line highlight options from an empty string', () => {
      // GIVEN
      const lineHighlight = `[]`;

      // WHEN
      const result = generateLineHighlightOptions(lineHighlight);

      // THEN
      expect(result).toMatchObject([]);
    });

    it('should generate line highlight options from string', () => {
      // GIVEN
      const lineHighlight = `[[3,"delete"],[6,"blur"],[7,"add"]]`;

      // WHEN
      const result = generateLineHighlightOptions(lineHighlight);

      // THEN
      const expectedResult = [
        { classes: ['line-diff line-diff-delete'], line: 3 },
        { classes: ['line-diff line-diff-blur'], line: 6 },
        { classes: ['line-diff line-diff-add'], line: 7 },
      ];

      expect(result).toMatchObject(expectedResult);
    });
  });

  describe('Test parseHTMLSnippetCode()', () => {});
});
