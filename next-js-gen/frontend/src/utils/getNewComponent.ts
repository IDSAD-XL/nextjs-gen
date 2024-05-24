import { ComponentsTypes } from '@/types/pageComponents/componentsTypes';
import { MockDiv } from '@/mock/elements/div';
import uuid4 from 'uuid4';
import { MockP } from '@/mock/elements/p';
import { MockImg } from '@/mock/elements/img';

export default function getNewComponent(
  name: ComponentsTypes['name']
): ComponentsTypes {
  console.log(name);
  let element: ComponentsTypes;
  switch (name) {
    case 'div':
      element = MockDiv;
      break;
    case 'p':
      element = MockP;
      break;
    case 'img':
      element = MockImg;
      break;
    default:
      element = MockDiv;
      break;
  }

  const clonedElement = structuredClone(element);

  clonedElement.id = uuid4();

  return clonedElement;
}
