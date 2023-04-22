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
} from './adpater/createAdapter';
export type {
  AxiosInstanceDefaults,
  AxiosInstance,
  AxiosStatic,
} from './axios';

export { CancelToken, isCancel } from './request/cancel';
export { isAxiosError } from './request/createError';
export { default as Axios } from './core/Axios';
export { createAdapter } from './adpater/createAdapter';
export { version } from './version';

export default axios;
