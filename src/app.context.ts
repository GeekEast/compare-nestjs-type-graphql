import { Request } from 'express';
import { IncomingHttpHeaders } from 'http';

export class AppContext {
  private readonly _headers: IncomingHttpHeaders;
  private readonly _url: string;
  private readonly _hostname: string;
  private readonly _params: Record<string, string>;
  private readonly _body: any;

  constructor(req: Request) {
    this._headers = req.headers;
    this._url = req.url;
    this._params = req.params;
    this._hostname = req.hostname;
    this._body = req.body;
  }

  public get url(): string {
    return this._url;
  }

  public get params(): Record<string, string> {
    return this._params;
  }

  public get hostname(): string {
    return this._hostname;
  }

  public get headers(): IncomingHttpHeaders {
    return this._headers;
  }

  public get body(): any {
    return this._body;
  }

  toString(): string {
    return JSON.stringify({
      headers: this._headers,
      hostname: this._hostname,
      url: this._url,
      params: this._params,
      body: this._body,
    });
  }
}
