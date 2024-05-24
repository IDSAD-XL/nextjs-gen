import { ImgElem } from '@/types/pageComponents/components';
export const MockImg: ImgElem = {
  id: 'mockImg',
  name: 'img',
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
          unit: 'string',
          value: 'yellow',
        },
      },
    },
  ],
  attributes: [
    {
      type: 'text',
      displayName: 'Src',
      name: 'src',
      value: '',
    },
    {
      type: 'text',
      displayName: 'Alt',
      name: 'alt',
      value: '',
    },
  ],
  slots: [],
};
