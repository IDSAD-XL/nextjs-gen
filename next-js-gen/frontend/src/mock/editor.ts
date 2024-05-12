import { Editor } from '@/types/editor';

export const editorData: Editor = {
  components: [
    {
      id: '1',
      name: 'div',
      styles: [
        {
          name: 'colors',
          props: {
            backgroundColor: {
              unit: 'hex',
              value: '#575757',
            },
          },
        },
        {
          name: 'size',
          props: {
            width: {
              unit: 'percent',
              value: '100%',
            },
            height: {
              unit: 'px',
              value: '100px',
            },
          },
        },
      ],
      slots: [
        {
          id: '2',
          name: 'div',
          styles: [
            {
              name: 'colors',
              props: {
                backgroundColor: {
                  unit: 'hex',
                  value: '#ff3434',
                },
              },
            },
            {
              name: 'size',
              props: {
                width: {
                  unit: 'px',
                  value: '600px',
                },
                height: {
                  unit: 'px',
                  value: '80px',
                },
              },
            },
          ],
          slots: [
            {
              id: '3',
              name: 'div',
              styles: [
                {
                  name: 'colors',
                  props: {
                    backgroundColor: {
                      unit: 'hex',
                      value: '#00ff12',
                    },
                  },
                },
                {
                  name: 'size',
                  props: {
                    width: {
                      unit: 'px',
                      value: '100px',
                    },
                    height: {
                      unit: 'px',
                      value: '80px',
                    },
                  },
                },
              ],
            },
            {
              id: '4',
              name: 'div',
              styles: [
                {
                  name: 'colors',
                  props: {
                    backgroundColor: {
                      unit: 'hex',
                      value: '#0059ff',
                    },
                  },
                },
                {
                  name: 'size',
                  props: {
                    width: {
                      unit: 'px',
                      value: '200px',
                    },
                    height: {
                      unit: 'px',
                      value: '80px',
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: '5',
      name: 'div',
      styles: [
        {
          name: 'colors',
          props: {
            backgroundColor: {
              unit: 'hex',
              value: '#d000ff',
            },
          },
        },
        {
          name: 'size',
          props: {
            width: {
              unit: 'px',
              value: '200px',
            },
            height: {
              unit: 'px',
              value: '80px',
            },
          },
        },
      ],
    },
  ],
};
