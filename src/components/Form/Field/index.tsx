import { useFormContext, UseFormReturn } from 'react-hook-form';
import { FieldConfig } from '..';
import ArrayFields from './src/ArrayFields';
import BooleanField from './src/BooleanField';
import EqualFields from './src/EqualFields';
import FileSelect from './src/FileSelect';
import HiddenInput from './src/HiddenInput';
import Input from './src/Input';
import MultiSelect from './src/MultiSelect';
import RadioOrCheckbox from './src/RadioOrCheckbox';
import Select from './src/Select';
import Signature from './src/Signature';
import Star from './src/Star';
import Tags from './src/Tags';
import Textarea from './src/Textarea';

type Props = {
  fieldConfig: FieldConfig;
};
type InnerProps = UseFormReturn & {
  fieldConfig: FieldConfig;
};

const Field = ({ fieldConfig }: Props) => {
  const methods = useFormContext();
  const { watch } = methods;

  const updatedFieldConfig = {
    ...fieldConfig,
    placeholder: fieldConfig.placeholder ?? `請輸入${fieldConfig.label}`,
    col: fieldConfig.col ?? 12,
  };

  if (fieldConfig.conditionObserver) {
    const arrayFieldName = fieldConfig.name.includes('.')
      ? fieldConfig.name.split('.').slice(0, -1).join('.') + '.'
      : '';
    const observer = `${arrayFieldName}${fieldConfig.conditionObserver.observer}`;

    const observerValue = watch(observer);

    const condition = fieldConfig.conditionObserver.conditions;

    if (!condition.map((item) => item !== observerValue).includes(false)) {
      return <></>;
    }
  }

  if (fieldConfig.validateObserver) {
    const arrayFieldName = fieldConfig.name.includes('.')
      ? fieldConfig.name.split('.').slice(0, -1).join('.') + '.'
      : '';
    const observer = `${arrayFieldName}${fieldConfig.validateObserver.observer}`;

    const observerValue = watch(observer);
    const condition = fieldConfig.validateObserver.condition(observerValue);
    fieldConfig.validate = condition
      ? fieldConfig.validateObserver.newValidate
      : fieldConfig.validateObserver.validate;
  }

  switch (fieldConfig.type) {
    case 'textarea':
      return <Textarea {...methods} fieldConfig={updatedFieldConfig} />;
    case 'radio':
    case 'checkbox':
      return <RadioOrCheckbox {...methods} fieldConfig={updatedFieldConfig} />;
    case 'select':
      return <Select {...methods} fieldConfig={updatedFieldConfig} />;
    case 'multiSelect':
      return <MultiSelect {...methods} fieldConfig={updatedFieldConfig} />;
    case 'boolean':
      return <BooleanField {...methods} fieldConfig={updatedFieldConfig} />;
    case 'star':
      return <Star {...methods} fieldConfig={updatedFieldConfig} />;
    case 'tags':
      return <Tags {...methods} fieldConfig={updatedFieldConfig} />;
    case 'imageSelect':
    case 'videoSelect':
      return <FileSelect {...methods} fieldConfig={updatedFieldConfig} />;
    case 'signature':
      return <Signature {...methods} fieldConfig={updatedFieldConfig} />;
    case 'hidden':
      return <HiddenInput {...methods} fieldConfig={updatedFieldConfig} />;
    case 'array':
      return <ArrayFields {...methods} fieldConfig={updatedFieldConfig} />;
    case 'equalFields':
      return <EqualFields {...methods} fieldConfig={updatedFieldConfig} />;
    default:
      return <Input {...methods} fieldConfig={updatedFieldConfig} />;
  }
};

export default Field;
export type { InnerProps };
