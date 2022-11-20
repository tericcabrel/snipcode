import * as yup from 'yup';

import { EditorFormValues } from '../../../../typings/snippet-form';
import { FORM_ERRORS } from '../../../../utils/constants';

const MIN_NAME_LENGTH = 1;
const MAX_NAME_LENGTH = 100;

export type SnippetFormValues = EditorFormValues;

export const formSchema = yup.object().shape({
  code: yup.string().required(FORM_ERRORS.fieldRequired),
  codeHighlighted: yup.string().required(FORM_ERRORS.fieldRequired),
  description: yup.string(),
  lineHighlight: yup.mixed(),
  name: yup
    .string()
    .required(FORM_ERRORS.fieldRequired)
    .min(MIN_NAME_LENGTH, FORM_ERRORS.minCharacters(MIN_NAME_LENGTH))
    .max(MAX_NAME_LENGTH, FORM_ERRORS.minCharacters(MAX_NAME_LENGTH)),
});
