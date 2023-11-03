/* eslint-disable @next/next/no-img-element */
import LoadingBlock from '@components/LoadingBlock';
import { dotKeysValue } from '@helpers/object';
import { setFileUploadFieldName } from '@reducers/file-upload';
import { fileUploadAsync } from '@reducers/file-upload/actions';
import { useEffect } from 'react';
import useAppDispatch from 'src/hook/useAppDispatch';
import useAppSelector from 'src/hook/useAppSelector';
import { InnerProps } from '..';

const FileSelect = ({
  register,
  watch,
  setValue,
  setError,
  clearErrors,
  formState: { errors },
  fieldConfig: {
    name,
    type,
    label,
    placeholder,
    required,
    disabled,
    defaultValue,
    accept,
    pattern,
    validate,
    col,
    max,
  },
}: InnerProps) => {
  const dispatch = useAppDispatch();

  const {
    fieldName,
    file,
    status: { uploadLoading },
    error: { uploadError },
  } = useAppSelector((state) => state.fileUpload);

  const currentValue = watch(name) ?? defaultValue;
  const isUploadingFile = fieldName === name;
  const error = dotKeysValue(errors, name)?.message || uploadError;

  const upload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = (event.target as HTMLInputElement).files;
    if (!fileList?.length) return;
    const file = fileList[0];

    const notValidSize = Number(max) && file.size > Number(max) * 1024 * 1024;
    if (notValidSize) {
      setError(name, {
        type: 'custom',
        message: `上傳的每個檔案需小於 ${max} MB`,
      });
      return;
    } else {
      clearErrors(name);
    }

    dispatch(setFileUploadFieldName(name));
    dispatch(fileUploadAsync(file));
  };

  useEffect(() => {
    if (!isUploadingFile || !file) return;
    setValue(name, file.url);
  }, [file, isUploadingFile, name, setValue]);

  return (
    <section className={`row__col row__col--${col} team-form__field`}>
      <label className='form__input' htmlFor={name}>
        <b>
          {required && '* '}
          {label}
        </b>
        <article className='file-select'>
          <section className='file-select__container'>
            {isUploadingFile && uploadLoading ? (
              <LoadingBlock />
            ) : currentValue ? (
              <>
                {type === 'imageSelect' && (
                  <img
                    className='file-select__img'
                    src={currentValue ?? defaultValue}
                    alt='上傳的圖片'
                  />
                )}
                {type === 'videoSelect' && (
                  <video width='100%' controls>
                    <source
                      src={currentValue ?? defaultValue}
                      type='video/mp4'
                    />
                  </video>
                )}
              </>
            ) : (
              <>
                {type === 'imageSelect' && <span className='icomoon-image' />}
                {type === 'videoSelect' && <span className='icomoon-film' />}
              </>
            )}
          </section>

          <section className='file-select__input'>
            <input
              {...register(name, {
                required: required && `${label}為必填欄位`,
                pattern,
                validate,
              })}
              id={name}
              type='text'
              placeholder={placeholder}
              disabled={disabled}
              defaultValue={defaultValue}
            />
          </section>

          <footer className='file-select__footer'>
            <a className='text-danger' onClick={() => setValue(name, '')}>
              清除
            </a>
            <a
              className='form__file-upload text-accent'
              onClick={() => setValue(name, '')}
            >
              上傳
              <input
                type='file'
                id={`${name}File`}
                accept={accept}
                onChange={upload}
              />
            </a>
          </footer>
        </article>

        {isUploadingFile && error && (
          <span className='form__error-message'>{error}</span>
        )}
      </label>
    </section>
  );
};

export default FileSelect;
