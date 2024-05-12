import { ComponentsTypes } from '@/types/pageComponents/componentsTypes';

export default function findComponentByIdPath(
  components: ComponentsTypes[],
  idPath: string[]
): ComponentsTypes | undefined {
  const id = [...idPath].shift();
  if (!id) return;
  const component = components.find((component) => component.id === id);
  if (!component) return;
  if (idPath.length === 0) return component;
  return findComponentByIdPath(component.slots || [], idPath);
}
