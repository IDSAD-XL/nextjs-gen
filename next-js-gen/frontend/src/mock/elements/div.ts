import { Div } from '@/types/pageComponents/components';
export const MockDiv: Div = {
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
  attributes: [
    {
      type: 'text',
      name: 'id',
      displayName: 'Id',
      value: '',
    },
    {
      type: 'select',
      name: 'test',
      displayName: 'Test',
      value: '',
      options: ['test1', 'test2', 'test3'],
    },
    {
      type: 'innerText',
      name: 'innerText',
      displayName: 'InnerText',
      value: '',
    },
  ],
  slots: [],
};
