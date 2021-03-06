import { Client, ClientInit } from 'http';

export class HttpClient implements Client {
  private readonly baseUrl: string;

  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
  }

  async request({ url, config }: ClientInit) {
    config = {
      ...{ headers: new Headers({ 'content-type': 'application/json' }) },
      ...config,
    };

    const targetUrl = url.startsWith('http') ? url : `${this.baseUrl}${url}`;

    const response = await fetch(targetUrl, config);

    if (response.status !== 200) throw new Error('request fail');

    return await response.json();
  }

  get({ url }: ClientInit) {
    return this.request({
      url,
      config: { method: 'GET' },
    });
  }

  post({ url, data = {} }: ClientInit) {
    const body = JSON.stringify(data);

    return this.request({
      url,
      config: { body, method: 'POST' },
    });
  }

  delete({ url, data = {} }: ClientInit) {
    const body = JSON.stringify(data);

    return this.request({
      url,
      config: { body, method: 'DELETE' },
    });
  }

  put({ url, data }: ClientInit): any {
    return null;
  }
}
