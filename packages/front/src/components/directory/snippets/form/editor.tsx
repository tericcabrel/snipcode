import { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { Highlighter } from 'shiki';

type Props = {
  highlighter?: Highlighter;
};

const SnippetTextEditor = ({ highlighter }: Props) => {
  const [code, setCode] = useState(`@ExceptionHandler(ConstraintViolationException.class)
public ResponseEntity<?> constraintViolationException(ConstraintViolationException ex, WebRequest request) {
  List<String> errors = new ArrayList<>();

  ex.getConstraintViolations().forEach(cv -> errors.add(cv.getMessage()));

  Map<String, List<String>> result = new HashMap<>();

  result.put("errors", errors);
  return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
}
`);

  const highlight = (code: string) => {
    if (!highlighter) {
      return code;
    }

    const text = highlighter
      .codeToHtml(code, {
        lang: 'java',
        lineOptions: [],
      })
      .replace('<pre class="shiki" style="background-color: #22272e">', '')
      .replace('</pre>', '')
      .split('\n')
      .map((line, i) => `<span class='line-number'>${i + 1}</span>${line}`)
      .join('\n');

    return text;
  };

  return (
    <Editor
      value={code}
      onValueChange={(code) => setCode(code)}
      highlight={(code) => highlight(code)}
      padding={6.5}
      style={{
        backgroundColor: '#22272e',
        fontFamily: 'Inter, monospace',
        fontSize: 14,
        height: '100%',
        overflow: 'auto',
      }}
      className="code-editor-container"
      tabSize={2}
      insertSpaces
    />
  );
};

export default SnippetTextEditor;
