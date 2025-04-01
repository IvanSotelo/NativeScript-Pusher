/// <reference path="../../references.d.ts" />
/// <reference path="./node_modules/@nativescript/types/index.d.ts" />

declare module 'com.pusher.client' {
  export class Pusher {
    constructor(key: string, options: PusherOptions);
    connect(): void;
    disconnect(): void;
    subscribe(channelName: string): Channel;
  }

  export class PusherOptions {
    setCluster(cluster: string): PusherOptions;
    setEncrypted(encrypted: boolean): PusherOptions;
    build(): PusherOptions;
  }

  export class PusherOptionsBuilder {
    setCluster(cluster: string): PusherOptionsBuilder;
    setEncrypted(encrypted: boolean): PusherOptionsBuilder;
    build(): PusherOptions;
  }

  export class Channel {
    bind(event: string, callback: (data: any) => void): void;
    unbind(event: string): void;
    unbind_all(): void;
  }
}
