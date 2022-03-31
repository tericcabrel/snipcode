import cuid, { isCuid } from 'cuid';

const newId = () => cuid();
const isValidId = (id: string) => isCuid(id);

export { newId, isValidId };
