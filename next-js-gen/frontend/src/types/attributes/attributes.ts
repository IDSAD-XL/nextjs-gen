export interface Attribute {
  name: string;
  displayName: string;
  value: string;
}

export interface AttributeText extends Attribute {
  type: 'text';
}

export interface AttributeSelect extends Attribute {
  type: 'select';
  options: string[];
}

export interface AttributeInnerText extends Attribute {
  type: 'innerText';
}

export type AttributesTypes = AttributeText | AttributeSelect | AttributeInnerText;
