import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativescriptPusherComponent } from './nativescript-pusher.component';

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: NativescriptPusherComponent }])],
  declarations: [NativescriptPusherComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class NativescriptPusherModule {}
