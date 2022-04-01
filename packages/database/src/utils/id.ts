import cuid, { isCuid } from 'cuid';

const generate = () => cuid();
const isValid = (id: string) => isCuid(id);

export default { generate, isValid };
