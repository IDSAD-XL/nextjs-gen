import React from 'react';
import { Attribute } from '@/types/attributes/attributes';

interface IAttributeItem {
  data: Attribute;
}

const AttributeItem: React.FC<IAttributeItem> = ({ data }) => {
  return <div></div>;
};

export default AttributeItem;
