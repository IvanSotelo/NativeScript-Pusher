import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedNativescriptPusher } from '@demo/shared';
import { NativescriptPusher, PusherChannel } from '@ivansotelo/nativescript-pusher';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptPusher {
  private pusher: NativescriptPusher;
  private channel: PusherChannel;
  private _messages: string[] = [];

  constructor() {
    super();
    this.initializePusher();
  }

  private initializePusher() {
    // Inicializar Pusher con tus credenciales
    this.pusher = new NativescriptPusher({
      appId: '84e3120f3fa705a987af',
      host: 'ws.capitalcheckin.app',
      wssPort: 443,
      encrypted: true,
    });

    // Conectar a Pusher
    this.pusher.connect();
  }

  public get messages(): string[] {
    return this._messages;
  }

  public set messages(value: string[]) {
    this._messages = value;
    this.notifyPropertyChange('messages', value);
  }

  public onUnsubscribe() {
    if (this.channel) {
      this.pusher.unsubscribe('mi-canal');
    }
  }

  public onDisconnect() {
    if (this.pusher) {
      this.pusher.disconnect();
    }
  }

  public onPageUnloaded() {
    this.onUnsubscribe();
    this.onDisconnect();
  }
}
