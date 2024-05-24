import React, { useCallback, useEffect, useState } from 'react';
import { AttributesTypes } from '@/types/attributes/attributes';
import { Input } from 'baseui/input';
import { Select } from 'baseui/select';
import { useDebounceCallback } from 'usehooks-ts';
import { Textarea } from 'baseui/textarea';

interface IAttributeItem {
  onValueChange: (
    name: AttributesTypes['name'],
    value: AttributesTypes['value']
  ) => void;
  data: AttributesTypes;
}

const AttributeItem: React.FC<IAttributeItem> = ({ data, onValueChange }) => {
  const [value, setValue] = useState<{ id: string; label: string }[]>([
    {
      id: data.value,
      label: data.value,
    },
  ]);

  const debouncedValueCb = useDebounceCallback(onValueChange, 200);

  const valueChangeHandler = useCallback(
    (value: any) => {
      console.log(value);
      setValue([
        {
          id: value,
          label: value,
        },
      ]);
      debouncedValueCb(data.name, value);
    },
    [data.name, debouncedValueCb]
  );

  useEffect(() => {
    setValue([{ id: data.value, label: data.value }]);
  }, [data.value]);

  return (
    <div className="mb-[10px] flex flex-col text-small">
      <p className="mr-[10px]">{data.displayName}</p>
      <div className="mt-[5px] flex gap-[5px]">
        {data.type === 'innerText' && (
          <Textarea
            size={'mini'}
            type="text"
            value={value[0].id}
            onChange={(e) => valueChangeHandler(e.target.value)}
          />
        )}
        {data.type === 'text' && (
          <Input
            size={'mini'}
            type="text"
            value={value[0].id}
            onChange={(e) => valueChangeHandler(e.target.value)}
          />
        )}
        {data.type === 'select' && (
          <Select
            value={value}
            size={'mini'}
            clearable={false}
            searchable={false}
            options={data.options.map((item) => ({
              id: item,
              label: item,
            }))}
            onChange={(params) => valueChangeHandler(params.value[0].id)}
          />
        )}
      </div>
    </div>
  );
};

export default AttributeItem;
