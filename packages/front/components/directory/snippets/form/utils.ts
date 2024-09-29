import { capitalize } from 'lodash';
import { BUNDLED_LANGUAGES } from 'shiki';

import { SelectOption } from '../../../../types/components';

export const generateSnippetLanguageOptions = (): SelectOption[] => {
  return BUNDLED_LANGUAGES.map((language) => ({
    id: language.id,
    label: capitalize(language.id),
  }));
};
