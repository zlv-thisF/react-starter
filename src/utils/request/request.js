import {
  createRequest,
  enhanceHeader,
  enhanceContentType,
  enhanceUrl,
  checkStatus,
  formatResponse,
} from "./requstUtils";

class InterceptorManager {
  constructor(handlers) {
    this.handlers = handlers;
  }

  use = (fullFilled, rejected) => {
    this.handlers.push({
      fullFilled,
      rejected,
    });
  };

  reduceHandlers = promise => {
    this.handlers.reduce((prev, cur) => {
      return prev.then(cur.fullFilled, cur.rejected);
    }, promise);
  };
}

class Request {
  constructor(initConfig = {}) {
    this.initConfig = initConfig;
    this.interceptors = {
      request: new InterceptorManager([]),
      response: new InterceptorManager([]),
    };
    this.init();
  }

  init = () => {
    ["get", "post", "put", "delete", "methods", "patch", "head"].forEach(
      method => {
        this[method] = config => this.send(config);
      }
    );
  };

  send = config => {
    config.method = config.method ? config.method.toLowerCase() : "get";
    let promise = Promise.resolve(config);
    promise = this.interceptors.request.reduceHandlers(promise);
    promise = promise.then(configParams => fetch(configParams));
    promise = this.interceptors.response.reduceHandlers(promise);
    return promise;
  };
}

const request = new Request();

request.interceptors.request.use(enhanceHeader);
request.interceptors.request.use(enhanceContentType);
request.interceptors.request.use(enhanceUrl);

request.interceptors.response.use(checkStatus);
request.interceptors.response.use(formatResponse);

export default createRequest(Request.prototype.send, request);
