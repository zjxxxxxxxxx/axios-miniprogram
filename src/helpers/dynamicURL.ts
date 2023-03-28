import { isPlainObject } from './isTypes';

const dynamicREG = /\/?(:([a-zA-Z_$][\w-$]*))\/??/g;

export function dynamicInterpolation(
  url: string,
  sourceData?: unknown,
): string {
  if (!isPlainObject(sourceData)) {
    return url;
  }

  return url.replace(dynamicREG, ($1, $2, $3) =>
    $1.replace($2, sourceData[$3]),
  );
}

export function isDynamicURL(url: string): boolean {
  dynamicREG.lastIndex = 0;
  return dynamicREG.test(url);
}
