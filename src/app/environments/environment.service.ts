import { Injectable } from '@angular/core';

declare global {
  interface Window {
    env: {
      clientId: string;
      clientSecret: string;
      tenantId: string;
      authority: string;
      redirectUri: string;
    };
  }
}

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  private readonly _clientId: string = '';
  private readonly _clientSecret: string = '';
  private readonly _tenantId: string = '';
  private readonly _authority: string = '';
  private readonly _redirectUri: string = 'http://localhost:4200/';

  constructor() {}

  get production(): boolean {
    return false; // Change based on your needs
  }

  get clientId(): string {
    return window['env']?.['clientId'] || this._clientId;
  }

  get clientSecret(): string {
    return window['env']?.['clientSecret'] || this._clientSecret;
  }

  get tenantId(): string {
    return window['env']?.['tenantId'] || this._tenantId;
  }

  get authority(): string {
    const tenantId = this.tenantId;
    return window['env']?.['authority'] ||
      (tenantId ? `https://login.microsoftonline.com/${tenantId}` : this._authority);
  }

  get redirectUri(): string {
    return window['env']?.['redirectUri'] || this._redirectUri;
  }

  get auth() {
    return {
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      tenantId: this.tenantId,
      authority: this.authority,
      redirectUri: this.redirectUri
    };
  }
}
