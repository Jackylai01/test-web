import { useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';
import Field, { InnerProps } from '..';

const ArrayFields = ({
  setValue,
  fieldConfig: { name, label, defaultValue, fieldConfigs },
}: InnerProps) => {
  const { fields, append, remove, move } = useFieldArray({ name });

  useEffect(() => {
    setValue(name, defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  return (
    <section className='array-fields'>
      <label className='form__input' htmlFor={name}>
        <b>{label}</b>
      </label>

      <main className='array-fields__container'>
        <button
          className='array-fields__append-btn'
          type='button'
          onClick={() => append({})}
        >
          <span className='icomoon-create'></span>
        </button>
        <ul className='array-fields__items'>
          {fields.map((field, index, arr) => (
            <li key={`${name}.${index}`}>
              <header className='array-fields__item-header'>
                <h2>{`${label}${index + 1}`}</h2>
                <section className='array-fields__item-actions'>
                  <button type='button' onClick={() => remove(index)}>
                    <span className='icomoon-bin'></span>
                  </button>
                  <button
                    type='button'
                    style={{ transform: 'rotate(180deg)' }}
                    disabled={index === 0}
                    onClick={() => move(index, index - 1)}
                  >
                    <span className='icomoon-arrow-dropdown'></span>
                  </button>
                  <button
                    type='button'
                    disabled={index === arr.length - 1}
                    onClick={() => move(index, index + 1)}
                  >
                    <span className='icomoon-arrow-dropdown'></span>
                  </button>
                </section>
              </header>
              <main className='row'>
                {fieldConfigs &&
                  fieldConfigs.map((fieldConfig) => {
                    const innerName = `${name}.${index}.${fieldConfig.name}`;
                    return (
                      <Field
                        key={innerName}
                        fieldConfig={{
                          ...fieldConfig,
                          name: innerName,
                          defaultValue: (field as any)[fieldConfig.name],
                        }}
                      />
                    );
                  })}
              </main>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
};

export default ArrayFields;
