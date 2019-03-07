import { isObject, isString } from "lodash";
import qs from "qs";

export interface FetchRequestInit extends RequestInit {
  query?: any;
  url: string;
}

const RESPONSE_TYPES = {
  "application/json": "json",
  "text/html": "text",
  "Blob/File": "blob",
  "application/vnd.ms-excel": "blob",
  FormData: "formData",
  ArrayBuffer: "arrayBuffer",
};

export const createRequest = (fn: any, obj: any): any => {
  return (...rest: any[]) => {
    const args = Array.from(rest);
    return fn.apply(obj, args);
  };
};

export const enhanceHeader = (config: FetchRequestInit): FetchRequestInit => {
  return {
    ...config,
    headers: Object.assign(config.headers || {}, {
      credential: "include",
    }),
  };
};

export const enhanceContentType = (
  config: FetchRequestInit
): FetchRequestInit => {
  const { body, method, query } = config;
  let { headers } = config;
  if (!isObject(headers)) {
    config.headers = {};
    headers = { ...config.headers };
  }
  if (!isString(headers["Content-Type"])) {
    if (body instanceof FormData) {
      delete headers["Content-Type"];
    } else if (
      method.toLowerCase() === "post" ||
      method.toLowerCase() === "put"
    ) {
      if (isObject(body)) {
        config.body = JSON.stringify(body);
        headers["Content-Type"] = "application/json; charset=utf-8";
      }
    }
    if (isObject(query)) {
      headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
  }
  return config;
};

export const enhanceUrl = (config: FetchRequestInit): FetchRequestInit => {
  if (config.query) {
    config.url = `${config.url}?${qs.stringify(config.query)}`;
  }
  return config;
};

export const checkStatus = (res: Response): Response | Error => {
  const isStatusOk = (response: Response): boolean => {
    const { status } = response;
    return status >= 200 && status < 400;
  };
  if (isStatusOk(res)) {
    return res;
  }
  throw new Error("you can custom you error here");
};

export const formatResponse = (res: Response): any => {
  const contentType = res.headers.get("content-type");
  let responseType = "";
  if (contentType) {
    responseType = RESPONSE_TYPES[contentType];
  }
  return responseType ? res[responseType]() : res;
};
