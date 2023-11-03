import { fieldSetDefault } from '@helpers/field-set-default';
import { InputHTMLAttributes, useEffect } from 'react';
import {
  FormProvider,
  RegisterOptions,
  Validate,
  useForm,
} from 'react-hook-form';
import Field from './Field';

type FieldConfig = Omit<
  InputHTMLAttributes<HTMLInputElement | HTMLSelectElement>,
  'pattern'
> &
  RegisterOptions & {
    name: string; // override InputHTMLAttributes
    type: string; // override InputHTMLAttributes
    label: string;
    col?: number;
    options?: any[]; // type='select'
    displayOptions?: any[]; // type='select'
    withEmptyOption?: boolean; // type='select'
    fieldConfigs?: FieldConfig[]; // type='array'
    conditionObserver?: {
      observer: string;
      conditions: string[];
    };
    validateObserver?: {
      observer: string;
      condition: (value: any) => boolean;
      validate?: Validate<any>;
      newValidate: Validate<any>;
    };
  };

type Props = {
  fieldConfigs: FieldConfig[];
  resetData?: any;
  onSubmit: (data: any) => void;
  children?: React.ReactNode;
};

const Form = ({ fieldConfigs, onSubmit, resetData, children }: Props) => {
  const methods = useForm();

  useEffect(() => {
    if (!resetData) return;
    methods.reset(fieldSetDefault(fieldConfigs, resetData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetData]);

  return (
    <FormProvider {...methods}>
      <form
        className='form team-form'
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <article className='row'>
          {fieldConfigs.map((fieldConfig) => (
            <Field key={fieldConfig.name} fieldConfig={fieldConfig} />
          ))}
          {children}
        </article>
      </form>
    </FormProvider>
  );
};

export default Form;
export type { FieldConfig };
