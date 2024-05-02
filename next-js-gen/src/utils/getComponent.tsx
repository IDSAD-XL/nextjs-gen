import { BaseComponent } from '@/types/pageComponents/baseComponent';
import DivElement from '@/components/elements/DivElement';
import { Div } from '@/types/pageComponents/components';

export default function getComponent(
  component: BaseComponent,
  key: number | string
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
  return (
    // @ts-ignore
    <Comp key={key} {...component}>
      {component.slots && getSlots(component.slots)}
    </Comp>
  );
}

function getSlots(slots: BaseComponent[]) {
  console.log(slots);
  if (!slots) return null;
  return slots.map((slot) => {
    return getComponent(slot, slot.id);
  });
}
