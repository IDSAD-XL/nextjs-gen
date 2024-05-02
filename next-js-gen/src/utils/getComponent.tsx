import DivElement from '@/components/elements/DivElement';
import { ComponentsTypes } from '@/types/pageComponents/componentsTypes';

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
    // @ts-ignore
    <Comp key={key} {...component} path={currentPath}>
      {component.slots && getSlots(component.slots, currentPath)}
    </Comp>
  );
}

function getSlots(slots: ComponentsTypes[], path: string[]) {
  if (!slots) return null;
  return slots.map((slot) => {
    return getComponent(slot, slot.id, path);
  });
}
