import DivElement from '@/components/elements/DivElement';
import { ComponentsTypes } from '@/types/pageComponents/componentsTypes';
import { ElementWithDropTarget } from '@/components/editor/ElementWithDropTarget';

export default function getComponent(
  component: ComponentsTypes,
  key: number | string,
  path: string[] = []
) {
  let Comp;
  switch (component.name) {
    case 'div':
      Comp = DivElement;
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
