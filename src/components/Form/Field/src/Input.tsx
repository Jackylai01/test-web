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
    col,
  },
}: InnerProps) => {
  let currentDefaultValue = defaultValue;

  switch (type) {
    case 'date':
      if (!defaultValue) break;
      currentDefaultValue = defaultDate(defaultValue as string);
      name.includes('.') && setValue(name, currentDefaultValue);
      break;
  }

  return (
    <section className={`row__col row__col--${col} team-form__field`}>
      <label className='form__input' htmlFor={name}>
        {required && '* '}
        {label}
      </label>
      <input
        {...register(name, {
          required: required && `${label}為必填欄位`,
          valueAsNumber: type === 'number',
          pattern,
          validate,
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
    </section>
  );
};

export default Input;
