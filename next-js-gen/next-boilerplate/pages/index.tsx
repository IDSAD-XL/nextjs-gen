import React from 'react';
import config from '../config.json'
import getComponent from "../utils/getComponent";
import { ComponentsTypes } from "@/types/pageComponents/componentsTypes";

const Index = () => {
  return (
    <div>
      {config.components.map((component, index) => {
        return getComponent(component as ComponentsTypes, index, []);
      })}
    </div>
  );
};

export default Index;