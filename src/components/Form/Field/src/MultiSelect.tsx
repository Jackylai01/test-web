import { dotKeysValue } from '@helpers/object';

import { useEffect } from 'react';
import useOutsideTrigger from 'src/hook/useOutsideTrigger';
import { InnerProps } from '..';

const MultiSelect = ({
  register,
  watch,
  setValue,
  setError,
  clearErrors,
  formState: { errors },
  fieldConfig: {
    name,
    label,
    required,
    defaultValue,
    pattern,
    validate,
    col,
    options,
  },
}: InnerProps) => {
  const { ref, isOutsideTrigger, setIsOutsideTrigger } =
    useOutsideTrigger<HTMLOListElement>(false);
  const currentValue = watch(name) || defaultValue || [];

  const selectOption = (value: any) => {
    const newValue = currentValue.includes(value)
      ? currentValue.filter((option: any) => option !== value)
      : [...currentValue, value];
    setValue(name, newValue);
    checkRequired(newValue);
  };

  useEffect(() => {
    checkRequired(currentValue as string[]);
    return () => {
      setValue(name, null);
      clearErrors(name);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  const checkRequired = (value?: string[]) => {
    if (required && !value?.length) {
      setError(name, { type: 'required', message: `${label}為必填欄位` });
    } else {
      clearErrors(name);
    }
  };

  return (
    <section className={`row__col row__col--${col}`}>
      <label className='form__input' htmlFor={name}>
        <b>
          {required && '* '}
          {label}
        </b>
        <article className='dropdown dropdown--select'>
          <header
            className='dropdown__header'
            onClick={() => setIsOutsideTrigger(!isOutsideTrigger)}
          >
            {currentValue
              .map(
                (value: any) =>
                  options?.find((option) => option.value === value)?.name,
              )
              .join('、')}
            <span className='icomoon-arrow-dropdown'></span>
          </header>
          <ol
            ref={ref}
            className={`dropdown__container ${
              isOutsideTrigger ? ' active' : ''
            }`}
          >
            {options?.map(({ name: optionName, value }, index) => (
              <li key={index}>
                <label htmlFor={optionName + value}>
                  <input
                    id={optionName + value}
                    type='checkbox'
                    checked={currentValue.includes(value)}
                    onChange={() => selectOption(value)}
                  />
                  {optionName}
                </label>
              </li>
            ))}
          </ol>
        </article>
        {dotKeysValue(errors, name) && (
          <span className='form__error-message'>
            {dotKeysValue(errors, name)?.message}
          </span>
        )}
      </label>
    </section>
  );
};

export default MultiSelect;
