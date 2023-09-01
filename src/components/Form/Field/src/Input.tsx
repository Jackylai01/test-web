import { defaultDate } from '@helpers/date';
import { dotKeysValue } from '@helpers/object';
import { InnerProps } from '..';

const Input = ({
  register,
  setValue,
  formState: { errors },
  fieldConfig: {
    name,
    type,
    label,
    placeholder,
    required,
    disabled,
    defaultValue,
    pattern,
    validate,
    min,
    col,
  },
}: InnerProps) => {
  let currentDefaultValue = defaultValue;

  switch (type) {
    case 'date':
      if (!defaultValue) break;
      setValue(name, defaultDate(defaultValue as string));
      break;
  }

  return (
    <section className={`row__col row__col--${col}`}>
      <label className='form__input' htmlFor={name}>
        <b>
          {required && '* '}
          {label}
        </b>
        <input
          {...register(name, {
            required: required && `${label}為必填欄位`,
            valueAsNumber: type === 'number',
            pattern,
            validate,
            min: { value: min as number, message: `最小值為 ${min}` },
          })}
          id={name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          defaultValue={currentDefaultValue}
        />
        {dotKeysValue(errors, name) && (
          <span className='form__error-message'>
            {dotKeysValue(errors, name)?.message}
          </span>
        )}
      </label>
    </section>
  );
};

export default Input;
