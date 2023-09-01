import { FieldConfig } from '@components/Form';
import Field from '@components/Form/Field';
import LoadingLayout from '@components/Layout/LoadingLayout';
import { fieldSetDefault } from '@helpers/field-set-default';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

type Props = {
  title: string;
  isLoading: boolean;
  detailData: unknown | null;
  fieldConfigs?: FieldConfig[];
  onSubmit: (data: any) => void;
  error?: string | null;
  actions: React.ReactNode;
  children?: React.ReactNode;
};

const FormLayoutUI = ({
  title,
  isLoading,
  detailData,
  fieldConfigs,
  onSubmit,
  error,
  actions,
  children,
}: Props) => {
  const methods = useForm();

  useEffect(() => {
    if (!detailData) return;
    const editData = fieldSetDefault(fieldConfigs || [], detailData);
    methods.reset(editData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailData, fieldConfigs]);

  return (
    <form
      className='container container--full'
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      <LoadingLayout isLoading={isLoading}>
        <article className='container container--full'>
          <header className='container__header'>
            <h2 className='container__title'>{title}</h2>
            <section className='container__actions'>{actions}</section>
          </header>
          <main className='container__context'>
            <FormProvider {...methods}>
              <div className='form'>
                <article className='row'>
                  {error && (
                    <section className='row__col'>
                      <p className='form__error-message'>{error}</p>
                    </section>
                  )}
                  {fieldConfigs?.map((fieldConfig) => (
                    <Field key={fieldConfig.name} fieldConfig={fieldConfig} />
                  ))}
                  {children}
                </article>
              </div>
            </FormProvider>
          </main>
        </article>
      </LoadingLayout>
    </form>
  );
};

export default FormLayoutUI;
