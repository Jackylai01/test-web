import axios, {
  AxiosError,
  AxiosRequestHeaders,
  AxiosResponse,
  CancelToken,
} from 'axios';
import { Metadata } from '../../models/entities/shared/pagination';
import instance from './instance';

export const pureApiRequest = axios.create();

export const getRequest = async <T>(
  url: string,
  headers?: AxiosRequestHeaders,
) => {
  return instance.get<any, ApiResponse<T>>(url, { headers });
};

export const postRequest = async <T>(
  url: string,
  data?: any,
  headers?: AxiosRequestHeaders,
) => {
  return instance.post<any, ApiResponse<T>>(url, data, { headers });
};

export const putRequest = async <T>(
  url: string,
  data?: any,
  headers?: AxiosRequestHeaders,
) => {
  return instance.put<any, ApiResponse<T>>(url, data, { headers });
};

export const deleteRequest = async <T>(
  url: string,
  headers?: AxiosRequestHeaders,
) => {
  return instance.delete<any, ApiResponse<T>>(url, { headers });
};

export const downloadBlob = async (url: string) => {
  const { result }: any = await instance.get(url, { responseType: 'blob' });
  if (result instanceof Blob) {
    return result as Blob;
  } else {
    return new Blob([result]);
  }
};

// export const downloadRequestFromUrl = async (url: string, fileName: string) => {
//   const blob = await downloadBlob(url);
//   downloadRequestFromBlob(blob, fileName);
// };

// export const downloadRequestFromBlob = (blob: Blob, fileName: string) => {
//   if (isBrowser()) {
//     saveAs(blob, fileName);
//   }
// };

export const uploadRequest = async <T>(
  url: string,
  file: File,
  onUploadProgress?: (progress: number, event: any, file: File) => void,
  cancelToken?: CancelToken,
  headers?: AxiosRequestHeaders,
) => {
  const formData = new FormData();
  formData.append('file', file);

  const onUploadProgressHandler = (event: any) => {
    if (onUploadProgress && event.lengthComputable) {
      const progress = Math.floor((event.loaded / file.size) * 100);
      onUploadProgress(progress, event, file);
    }
  };

  return instance.post<any, ApiResponse<T>>(url, formData, {
    onUploadProgress: onUploadProgressHandler,
    cancelToken,
    headers: {
      ...(headers as any),
      'Content-Type': 'multipart/form-data',
    },
  });
};

export type ApiResponse<T> = {
  status: number;
  result: T;
  error?: ExceptionData | undefined;
  res: AxiosResponse;
  err?: AxiosError | undefined;
};

export type ApiResult<T> = {
  data: T;
};

export type ApiListResult<T> = {
  data: T[];
};

export type ApiPaginationResult<T> = {
  data: T[];
  metadata: Metadata;
};

export type ExceptionData = {
  statusCode: number;
  message: string;
  details: {
    message: string;
    field: string | undefined;
    value: any | undefined;
  }[];
  timestamp: string;
};
