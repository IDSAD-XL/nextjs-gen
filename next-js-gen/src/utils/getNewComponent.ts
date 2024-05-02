import { ComponentsTypes } from '@/types/pageComponents/componentsTypes';
import { MockDiv } from '@/mock/elements/div';
import uuid4 from 'uuid4';

export default function getNewComponent(
  name: ComponentsTypes['name']
): ComponentsTypes {
  let element: ComponentsTypes;
  switch (name) {
    case 'div':
      element = MockDiv;
      break;
    default:
      element = MockDiv;
  }

  element.id = uuid4();

  return element;
}
