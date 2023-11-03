import { dotKeysValue } from '@helpers/object';
import { InnerProps } from '..';

const Star = ({
  register,
  watch,
  setValue,
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
  },
}: InnerProps) => {
  const currentValue = watch(name) ?? defaultValue;

  return (
    <section className={`row__col row__col--${col}`}>
      <label className='form__input' htmlFor={name}>
        <b>
          {required && '* '}
          {label}
        </b>
        <article className='form__star'>
          <input
            {...register(name, {
              required: required && `${label}為必填欄位`,
              valueAsNumber: true,
              pattern,
              validate,
            })}
            id={name}
            type='number'
            placeholder={placeholder}
            disabled={disabled}
            defaultValue={defaultValue}
          />
          {[1, 2, 3, 4, 5].map((starNumber) => (
            <span
              key={starNumber}
              className={`icon icomoon-star-${
                currentValue >= starNumber ? 'full' : 'empty'
              }`}
              onClick={() => setValue(name, starNumber)}
            />
          ))}
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

export default Star;
