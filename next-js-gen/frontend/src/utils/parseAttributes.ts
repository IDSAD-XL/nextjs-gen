import { AttributesTypes } from '@/types/attributes/attributes';

export const parseAttributes = (attributes?: AttributesTypes[]) => {
  if (!attributes) {
    return {};
  }
  return attributes.reduce(
    (acc, attribute) => {
      if (attribute.value && attribute.type !== 'innerText') {
        acc[attribute.name] = attribute.value;
      }
      return acc;
    },
    {} as { [key: string]: string }
  );
};
