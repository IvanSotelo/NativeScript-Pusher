import { NativescriptPusherCommon, PusherOptions, PusherChannel } from './common';

export declare class NativescriptPusher extends NativescriptPusherCommon {
  constructor(options: PusherOptions);
  connect(): void;
  disconnect(): void;
  subscribe(channelName: string): PusherChannel;
  unsubscribe(channelName: string): void;
  isConnected(): boolean;
}

export { PusherOptions, PusherChannel };
