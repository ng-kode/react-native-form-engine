import React from 'react';

export interface FormEngineProps {
  fields: Array<{
    path: string;
    template: string;
    templateProps?: {
      [customProp: string]: any;
    };
  }>;
  formValue: object;
  onChange(formValue: object): void;
  templates?: {
    [templateName: string]: (props: {
      value: any;
      onChange(value: any): void;
      touched: boolean;
      dirty: boolean;
      errorText?: string;
      onBlur(): void;
      [customProp: string]: any;
    }) => JSX.Element;
  };
  validatejs?: any;
}

export default class FormEngine extends React.Component<FormEngineProps> {}
