export declare function buildURL(
  url?: string,
  params?: any,
  paramsSerializer?: typeof paramsSerialization,
): string;
export declare function combineURL(
  baseURL: string | undefined,
  url: string,
): string;
export declare function dynamicInterpolation(
  url: string,
  sourceData?: any,
): string;
export declare function isAbsoluteURL(url: string): boolean;
export declare function isDynamicURL(url: string): boolean;
declare function paramsSerialization(params?: any): string;
export {};
