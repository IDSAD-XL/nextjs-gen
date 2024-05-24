import PElem from '@/types/pageComponents/components/PElem';
export const MockP: PElem = {
  id: 'mockP',
  name: 'p',
  styles: [
    {
      name: 'colors',
      props: {
        color: {
          unit: 'hex',
          value: '#000',
        },
      },
    },
  ],
  attributes: [
    {
      type: 'innerText',
      name: 'innerText',
      displayName: 'InnerText',
      value: 'text',
    },
  ],
  slots: [],
};
