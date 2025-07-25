import { isResponseError } from './httpUtils';

export class HttpService {
  constructor(apiAdapter, globalErrorHandler) {
    this.apiAdapter = apiAdapter;
    this.globalErrorHandler = globalErrorHandler;
  }

  async _requestHandler(request, localErrorHandler) {
    const response = await request;

    if (!isResponseError(response)) {
      return response;
    }

    let { error } = response;

    if (error === 'UNKNOWN' && localErrorHandler) {
      error = localErrorHandler(response);
    }

    if (error === 'UNKNOWN' && this.globalErrorHandler) {
      error = this.globalErrorHandler(response);
    }

    return {
      ...response,
      error,
    };
  }

  _get(url, options, errorHandler) {
    return this._requestHandler(
      this.apiAdapter.get(url, options),
      errorHandler,
    );
  }

  _post(url, body, options, errorHandler) {
    return this._requestHandler(
      this.apiAdapter.post(url, body, options),
      errorHandler,
    );
  }

  _put(url, body, options, errorHandler) {
    return this._requestHandler(
      this.apiAdapter.put(url, body, options),
      errorHandler,
    );
  }

  _patch(url, body, options, errorHandler) {
    return this._requestHandler(
      this.apiAdapter.patch(url, body, options),
      errorHandler,
    );
  }

  _delete(url, options, errorHandler) {
    return this._requestHandler(
      this.apiAdapter.delete(url, options),
      errorHandler,
    );
  }
}