import axios from 'axios';

export class AxiosHttpAdapter {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async _request(method, ...args) {
    try {
      const response = await this.axios[method](...args);
      return {
        data: response.data,
        status: response.status,
        headers: response.headers,
        url: response.config.url,
      };
    } catch (error) {
      if (axios.isCancel(error)) {
        return { error: 'CANCELED' };
      }
      if (error.response) {
        return {
          error: 'UNKNOWN',
          data: error.response.data,
          status: error.response.status,
          headers: error.response.headers,
          url: error.response.config.url,
        };
      }
      if (error.request) {
        return { error: 'NETWORK' };
      }
      return { error: 'UNKNOWN' };
    }
  }

  get(url, options) {
    return this._request('get', url, options);
  }

  post(url, body, options) {
    return this._request('post', url, body, options);
  }

  put(url, body, options) {
    return this._request('put', url, body, options);
  }

  patch(url, body, options) {
    return this._request('patch', url, body, options);
  }

  delete(url, options) {
    return this._request('delete', url, options);
  }
}