import { DivElem } from '@/types/pageComponents/components';
export const MockDiv: DivElem = {
  id: 'mockDiv',
  name: 'div',
  styles: [
    {
      name: 'size',
      props: {
        width: {
          unit: 'px',
          value: '100px',
        },
        height: {
          unit: 'px',
          value: '100px',
        },
      },
    },
    {
      name: 'colors',
      props: {
        backgroundColor: {
          unit: 'hex',
          value: '#7a7a7a',
        },
      },
    },
    {
      name: 'padding',
      props: {
        paddingTop: {
          unit: 'px',
          value: '10px',
        },
      },
    },
  ],
  slots: [],
};
