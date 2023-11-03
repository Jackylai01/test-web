/* eslint-disable @next/next/no-img-element */
import LoadingBlock from '@components/LoadingBlock';
import { dataURLtoFile } from '@helpers/canvas';
import { dotKeysValue } from '@helpers/object';

import { setFileUploadFieldName } from '@reducers/file-upload';
import { fileUploadAsync } from '@reducers/file-upload/actions';
import { useEffect, useRef } from 'react';
import { default as SignatureCanvas } from 'react-signature-canvas';
import useAppDispatch from 'src/hook/useAppDispatch';
import useAppSelector from 'src/hook/useAppSelector';
import { InnerProps } from '..';

const Signature = ({
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
  const dispatch = useAppDispatch();

  const {
    fieldName,
    file,
    status: { uploadLoading },
    error: { uploadError },
  } = useAppSelector((state) => state.fileUpload);

  const currentValue = watch(name) || defaultValue;
  const isUploadingFile = fieldName === name;
  const error = dotKeysValue(errors, name)?.message || uploadError;

  const canvasRef = useRef<SignatureCanvas>(null);

  const finish = () => {
    if (!canvasRef.current || canvasRef.current.isEmpty()) return;
    const newSignature = canvasRef.current
      .getTrimmedCanvas()
      .toDataURL('image/png');
    const file = dataURLtoFile(newSignature, 'signature.png');
    dispatch(setFileUploadFieldName(name));
    dispatch(fileUploadAsync(file));
  };

  const clear = () => {
    canvasRef.current?.clear();
    setValue(name, '');
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
        <input
          {...register(name, {
            required: required && `${label}為必填欄位`,
            pattern,
            validate,
          })}
          id={name}
          type='hidden'
          placeholder={placeholder}
          disabled={disabled}
          defaultValue={currentValue}
        />

        {isUploadingFile && uploadLoading ? (
          <LoadingBlock />
        ) : currentValue ? (
          <img
            className='form__signature'
            src={currentValue}
            alt='使用者簽名'
          />
        ) : (
          <SignatureCanvas
            ref={canvasRef}
            penColor='black'
            canvasProps={{
              className: 'form__signature',
              width: 500,
              height: 200,
            }}
          />
        )}

        <article className='form__actions' style={{ maxWidth: '500px' }}>
          <a className='btn btn--full text-danger' onClick={clear}>
            清除
          </a>
          <a className='btn btn--full' onClick={finish}>
            完成
          </a>
        </article>

        {isUploadingFile && error && (
          <span className='form__error-message'>{error}</span>
        )}
      </label>
    </section>
  );
};

export default Signature;
