import { Observable } from '@nativescript/core';

export interface PusherOptions {
  appId: string;
  key?: string;
  secret?: string;
  host?: string;
  wsPort?: number;
  wssPort?: number;
  cluster?: string;
  encrypted?: boolean;
  authEndpoint?: string;
}

export interface PusherChannel {
  name: string;
  bind(event: string, callback: (data: any) => void): void;
  unbind(event: string, callback: (data: any) => void): void;
  unbind_all(): void;
}

export class NativescriptPusherCommon extends Observable {
  protected options: PusherOptions;
  protected channels: Map<string, PusherChannel>;
  protected connected: boolean = false;

  constructor(options: PusherOptions) {
    super();
    this.options = options;
    this.channels = new Map();
  }

  connect(): void {
    throw new Error('Method not implemented.');
  }

  disconnect(): void {
    throw new Error('Method not implemented.');
  }

  subscribe(channelName: string): PusherChannel {
    throw new Error('Method not implemented.');
  }

  unsubscribe(channelName: string): void {
    throw new Error('Method not implemented.');
  }

  isConnected(): boolean {
    return this.connected;
  }
}
