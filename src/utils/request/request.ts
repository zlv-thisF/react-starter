import {
  createRequest,
  enhanceHeader,
  enhanceContentType,
  enhanceUrl,
  checkStatus,
  formatResponse,
  FetchRequestInit,
} from "./requstUtils";

type IFullfilledHandler = (config: FetchRequestInit) => any;
type IRejectedHandler = (arg: any) => any;

interface Handler {
  fullFilled: IFullfilledHandler;
  rejected: IRejectedHandler;
}

interface Imanager {
  use: (fullFilled: IFullfilledHandler, rejected: IRejectedHandler) => void;
  reduceHandlers: (promise: Promise<any>) => Promise<any>;
}

class InterceptorManager implements Imanager {
  private handlers: Handler[];

  public constructor(handlers?: Handler[]) {
    this.handlers = handlers;
  }

  public readonly use = (
    fullFilled: IFullfilledHandler,
    rejected?: IRejectedHandler
  ): void => {
    this.handlers.push({
      fullFilled,
      rejected,
    });
  };

  public readonly reduceHandlers = (promise: Promise<any>): Promise<any> => {
    return this.handlers.reduce((prev, cur) => {
      return prev.then(cur.fullFilled, cur.rejected);
    }, promise);
  };
}

interface Interceptors {
  request: InstanceType<typeof InterceptorManager>;
  response: InstanceType<typeof InterceptorManager>;
}

class Request {
  private initConfig: any;

  public interceptors: Interceptors;

  public constructor(initConfig?: any) {
    this.initConfig = initConfig;
    this.interceptors = {
      request: new InterceptorManager([]),
      response: new InterceptorManager([]),
    };
    this.init();
  }

  public readonly init = (): void => {
    ["get", "post", "put", "delete", "methods", "patch", "head"].forEach(
      method => {
        this[method] = (config: FetchRequestInit): Promise<any> =>
          this.send(config);
      }
    );
  };

  public readonly send = (config: FetchRequestInit): Promise<any> => {
    config.method = config.method ? config.method.toLowerCase() : "get";
    let promise = Promise.resolve(config);
    promise = this.interceptors.request.reduceHandlers(promise);
    promise = promise.then(
      (configParams: FetchRequestInit): Promise<any> =>
        window.fetch(configParams as any)
    );
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
