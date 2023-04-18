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
  AxiosProgressEvent,
  AxiosProgressCallback,
} from './core/Axios';
export type {
  AxiosAdapter,
  AxiosAdapterRequestConfig,
  AxiosAdapterRequestMethod,
  AxiosAdapterResponse,
  AxiosAdapterResponseData,
  AxiosAdapterResponseError,
  AxiosAdapterPlatform,
  AxiosAdapterRequest,
  AxiosAdapterRequestOptions,
  AxiosAdapterDownload,
  AxiosAdapterDownloadOptions,
  AxiosAdapterUpload,
  AxiosAdapterUploadOptions,
  AxiosAdapterTask,
} from './adapter';
export type {
  AxiosInstanceDefaults,
  AxiosInstance,
  AxiosStatic,
} from './axios';

export default axios;
