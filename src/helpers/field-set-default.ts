import { FieldConfig } from '@components/Form';
import { defaultDate } from './date';

export const fieldSetDefault = (
  sourceField: FieldConfig[],
  sourceData: any,
) => {
  let editField: any = {};

  sourceField.forEach((field) => {
    let defaultData = sourceData ? sourceData[field.name] : null;

    if (field.type === 'date' && defaultData) {
      defaultData = defaultDate(defaultData);
    }

    if (field.type === 'boolean') {
      defaultData = defaultData?.toString() === 'true';
    }

    editField[field.name] = defaultData;
  });

  return editField;
};

export const fieldSetOptions = (
  sourceFields: FieldConfig[],
  fieldName: string,
  options: any[],
  displayOptions?: any[],
) => {
  const optionsField = sourceFields.find(
    (field) => field.name === fieldName,
  ) as FieldConfig;
  optionsField.options = options;
  optionsField.displayOptions = displayOptions;
};
