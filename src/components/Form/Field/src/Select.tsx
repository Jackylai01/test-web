import { dotKeysValue } from '@helpers/object';
import { InnerProps } from '..';

const Select = ({
  register,
  formState: { errors },
  fieldConfig: {
    name,
    label,
    placeholder,
    required,
    disabled,
    defaultValue,
    pattern,
    validate,
    col,
    options,
    displayOptions,
  },
}: InnerProps) => {
  return (
    <section className={`row__col row__col--${col}`}>
      <label className='form__input' htmlFor={name}>
        <b>
          {required && '* '}
          {label}
        </b>
        <select
          {...register(name, {
            required: required && `${label}為必填欄位`,
            pattern,
            validate,
          })}
          id={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          disabled={disabled}
        >
          {options?.map((option, index) => (
            <option key={option} value={option}>
              {displayOptions && displayOptions[index]
                ? displayOptions[index]
                : option}
            </option>
          ))}
        </select>
        {dotKeysValue(errors, name) && (
          <span className='form__error-message'>
            {dotKeysValue(errors, name)?.message}
          </span>
        )}
      </label>
    </section>
  );
};

export default Select;
