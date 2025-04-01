import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptPusher } from '@demo/shared';
import {} from '@ivansotelo/nativescript-pusher';

@Component({
  selector: 'demo-nativescript-pusher',
  templateUrl: 'nativescript-pusher.component.html',
})
export class NativescriptPusherComponent {
  demoShared: DemoSharedNativescriptPusher;

  constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedNativescriptPusher();
  }
}
