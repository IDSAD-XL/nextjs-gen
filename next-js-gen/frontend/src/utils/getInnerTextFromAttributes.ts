import { AttributesTypes } from '@/types/attributes/attributes';

export function getInnerTextFromAttributes(attributes: AttributesTypes[]) {
  return attributes.find((attribute) => attribute.type === 'innerText');
}
