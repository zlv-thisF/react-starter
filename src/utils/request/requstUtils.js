import { isObject, isString } from "lodash";
import qs from "qs";

const RESPONSE_TYPES = {
  "application/json": "json",
  "text/html": "text",
  "Blob/File": "blob",
  "application/vnd.ms-excel": "blob",
  FormData: "formData",
  ArrayBuffer: "arrayBuffer",
};

export const createRequest = (fn, obj) => {
  return (...rest) => {
    const args = Array.from(rest);
    return fn.apply(obj, args);
  };
};

export const enhanceHeader = config => {
  return {
    ...config,
    headers: Object.assign(config.header || {}, {
      credential: "include",
    }),
  };
};

export const enhanceContentType = config => {
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

export const enhanceUrl = config => {
  if (config.query) {
    config.url = `${config.url}?${qs.stringify(config.query)}`;
  }
  return config;
};

export const checkStatus = res => {
  const isStatusOk = response => {
    const { status } = response;
    return status >= 200 && status < 400;
  };
  if (isStatusOk(res)) {
    return res;
  }
  throw new Error("you can custom you error here");
};

export const formatResponse = res => {
  const contentType = res.headers.get("content-type");
  let responseType = "";
  if (contentType) {
    [responseType] = RESPONSE_TYPES[contentType];
  }
  return responseType ? res[responseType]() : res;
};
