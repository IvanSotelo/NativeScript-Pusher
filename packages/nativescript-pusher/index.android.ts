import { NativescriptPusherCommon, PusherOptions, PusherChannel } from './common';
import * as utils from '@nativescript/core/utils';

export class NativescriptPusher extends NativescriptPusherCommon {
  private pusher: any;
  protected connected: boolean = false;

  constructor(options: PusherOptions) {
    super(options);

    const PusherClient = com.pusher.client.Pusher;
    const PusherOptions = com.pusher.client.PusherOptions;

    console.log('Inicializando Pusher con opciones:', {
      appId: this.options.appId,
      host: this.options.host,
      wssPort: this.options.wssPort,
      cluster: this.options.cluster,
    });

    const pusherOptions = new PusherOptions()
      .setUseTLS(true)
      .setEncrypted(this.options.encrypted || true)
      .setActivityTimeout(30000) // 30 segundos
      .setPongTimeout(5000); // 5 segundos

    if (this.options.host) {
      console.log('Configurando host:', this.options.host);
      pusherOptions.setHost(this.options.host);
    }

    if (this.options.wsPort) {
      pusherOptions.setWsPort(this.options.wsPort);
    }

    if (this.options.wssPort) {
      console.log('Configurando puerto WSS:', this.options.wssPort);
      pusherOptions.setWssPort(this.options.wssPort);
    }
    console.log('Configurando url:', pusherOptions.buildUrl('84e3120f3fa705a987af'));

    this.pusher = new PusherClient(this.options.appId, pusherOptions);
  }

  connect(): void {
    const ConnectionState = com.pusher.client.connection.ConnectionState;
    console.log('Intentando conectar a Pusher...');

    this.pusher.connect(
      new com.pusher.client.connection.ConnectionEventListener({
        onConnectionStateChange: (state: com.pusher.client.connection.ConnectionStateChange) => {
          console.log(`Estado de conexión cambiado de ${state.getPreviousState()} a ${state.getCurrentState()}`);
          console.log('Detalles del estado:', {
            currentState: state.getCurrentState(),
            previousState: state.getPreviousState(),
            connected: this.connected,
          });

          // this.connected = state.getCurrentState() === ConnectionState.CONNECTED;
          // this.notify({ object: this, eventName: 'state', value: state.getCurrentState() });
        },
        onError: (message: string, code: string, e: java.lang.Exception) => {
          console.error('Error de conexión:', message, code);
          if (e) {
            console.error('Excepción:', e.getMessage());
            console.error('Stack trace:', e.getStackTrace());
          }
          this.connected = false;
          this.notify({ object: this, eventName: 'state', value: ConnectionState.FAILED });
        },
      }),
      [ConnectionState.ALL]
    );

    console.log(this.pusher.getConnection().getState());
  }

  disconnect(): void {
    if (!this.connected) return;
    this.pusher.disconnect();
    this.connected = false;
  }

  subscribe(channelName: string): PusherChannel {
    if (!this.connected) {
      throw new Error('Pusher is not connected. Call connect() first.');
    }

    const channel = this.pusher.subscribe(channelName);
    const channelWrapper: PusherChannel = {
      name: channelName,
      bind: (event: string, callback: (data: any) => void) => {
        channel.bind(
          event,
          new com.pusher.client.channel.SubscriptionEventListener({
            onEvent: (pusherEvent: com.pusher.client.PusherEvent) => {
              callback(JSON.parse(pusherEvent.getData()));
            },
          })
        );
      },
      unbind: (event: string, callback: (data: any) => void) => {
        channel.unbind(event);
      },
      unbind_all: () => {
        channel.unbind_all();
      },
    };

    this.channels.set(channelName, channelWrapper);
    return channelWrapper;
  }

  unsubscribe(channelName: string): void {
    if (!this.connected) return;
    this.pusher.unsubscribe(channelName);
    this.channels.delete(channelName);
  }
}
