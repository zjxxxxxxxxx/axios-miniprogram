import axios from './axios';

export type {
  AxiosRequestConfig,
  AxiosRequestData,
  AxiosRequestFormData,
  AxiosRequestHeaders,
  AxiosRequestMethod,
  AxiosResponse,
  AxiosResponseData,
  AxiosResponseError,
  AxiosDownloadProgressEvent,
  AxiosDownloadProgressCallback,
  AxiosUploadProgressEvent,
  AxiosUploadProgressCallback,
} from './core/Axios';
export type {
  AxiosAdapter,
  AxiosAdapterRequestConfig,
  AxiosAdapterRequestMethod,
  AxiosAdapterResponse,
  AxiosAdapterResponseData,
  AxiosAdapterResponseError,
  AxiosAdapterRequest,
  AxiosAdapterRequestOptions,
  AxiosAdapterDownload,
  AxiosAdapterDownloadOptions,
  AxiosAdapterUpload,
  AxiosAdapterUploadOptions,
  AxiosAdapterPlatform,
  AxiosAdapterPlatformTask,
} from './adapter';
export type {
  AxiosInstanceDefaults,
  AxiosInstance,
  AxiosStatic,
} from './axios';

export { CancelToken, isCancel } from './core/cancel';
export { default as Axios } from './core/Axios';
export { isAxiosError } from './core/createError';
export { createAdapter } from './adapter';
export { version } from './version';

export default axios;
