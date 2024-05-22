import { GenericStyle } from '@/types/styles/styles';

export function parseStyles(
  styles: GenericStyle[]
): Record<string, string | number> {
  return styles.reduce((acc, style) => {
    const stylesObj = [...Object.entries(style.props)].reduce(
      (accPropsObject, currentProp) => {
        const [key, value] = currentProp;
        return {
          ...accPropsObject,
          [key]: value?.value,
        };
      },
      {}
    );
    return {
      ...acc,
      ...stylesObj,
    };
  }, {});
}
