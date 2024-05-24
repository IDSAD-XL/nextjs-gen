import DivElement from '@/components/elements/DivElement';
import { ComponentsTypes } from '@/types/pageComponents/componentsTypes';
import { ElementWithDropTarget } from '@/components/editor/ElementWithDropTarget';
import ParagraphElement from '@/components/elements/ParagraphElement';
import ImgElement from '@/components/elements/ImgElement';

export default function getComponent(
  component: ComponentsTypes,
  key: number | string,
  path: string[] = []
) {
  let Comp;
  console.log(component.name);
  switch (component.name) {
    case 'div':
      Comp = DivElement;
      break;
    case 'p':
      Comp = ParagraphElement;
      break;
    case 'img':
      Comp = ImgElement;
      break;
    default:
      Comp = DivElement;
      break;
  }

  const currentPath = [...path, component.id];

  return (
    <ElementWithDropTarget
      key={component.id}
      componentData={component}
      path={currentPath}
      Component={Comp}
    >
      {component.slots && getSlots(component.slots, currentPath)}
    </ElementWithDropTarget>
  );
}

function getSlots(slots: ComponentsTypes[], path: string[]) {
  if (!slots) return null;
  return slots.map((slot) => {
    return getComponent(slot, slot.id, path);
  });
}
