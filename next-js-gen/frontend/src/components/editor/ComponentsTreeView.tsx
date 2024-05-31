import React, { useEffect, useMemo } from 'react';
import useEditorStore from '@/store/useEditorStore';
import { ComponentsTypes } from '@/types/pageComponents/componentsTypes';
import {
  TreeView,
  toggleIsExpanded,
  TreeNodeData,
  TreeLabelInteractable,
} from 'baseui/tree-view';
import classNames from 'classnames';
import { Delete } from 'baseui/icon';

interface INestedComponents {
  id: string;
  label: (node: TreeNodeData) => React.ReactNode;
  isExpanded: boolean;
  pathIds: string[];
  children: INestedComponents[];
}

const getLabelCheckboxs = (label: React.ReactNode, pathIds: string[]) => () => {
  const [value, setValue] = React.useState(false);

  const { setActiveEditorComponentByPath, activeEditorComponent } =
    useEditorStore();

  const isActive = useMemo(() => {
    return activeEditorComponent?.component.id === pathIds[pathIds.length - 1];
  }, [activeEditorComponent, pathIds]);

  return (
    // @ts-ignore
    <TreeLabelInteractable>
      <div
        className={classNames({
          'w-full cursor-pointer px-[6px] py-[4px] hover:bg-gray-light': true,
          'bg-gray-light': isActive,
        })}
        onClick={() => {
          setActiveEditorComponentByPath(pathIds);
        }}
      >
        {label}
      </div>
    </TreeLabelInteractable>
  );
};

const getNestedComponent = (
  components: ComponentsTypes[],
  parentElementsPathIds: string[] = []
): INestedComponents[] => {
  return components.map((component) => {
    const pathIds = [...parentElementsPathIds, component.id];

    return {
      id: component.id,
      label: getLabelCheckboxs(component.name, pathIds),
      isExpanded: false,
      pathIds,
      children: getNestedComponent(component.slots || [], pathIds),
    };
  });
};

const ComponentsTreeView = () => {
  const { editorData, treeViewOpen, setTreeViewOpen } = useEditorStore();

  const [data, setData] = React.useState<INestedComponents[]>([]);

  useEffect(() => {
    setData(getNestedComponent(editorData.components));
  }, [editorData.components]);

  return (
    <div
      className={classNames({
        'fixed left-0 top-0 z-20 h-screen w-[400px] bg-gray-dark transition-transform':
          true,
        'translate-x-[-100%]': !treeViewOpen,
        'translate-x-0': treeViewOpen,
      })}
    >
      <div className="flex justify-end">
        <Delete
          color={'#fff'}
          size={50}
          onClick={() => {
            setTreeViewOpen(false);
          }}
          className="cursor-pointer transition-transform hover:scale-110 active:scale-90"
        />
      </div>
      <TreeView
        overrides={{
          Root: {
            style: {
              backgroundColor: 'transparent',
            },
          },
          TreeLabel: {
            style: ({ $theme, $isSelected }) => ({
              backgroundColor: 'transparent !important',
              color: '#fff',
            }),
          },
        }}
        data={data}
        onToggle={(node) => {
          // @ts-ignore
          setData((prevData) => toggleIsExpanded(prevData, node));
        }}
      />
    </div>
  );
};

export default ComponentsTreeView;
