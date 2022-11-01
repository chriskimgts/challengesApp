import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptModule } from '@nativescript/angular'
import { NativeScriptFormsModule } from '@nativescript/angular'
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular'

import { AppComponent } from './app.component'
import { StackComponent } from './layouts/stack/stack.component'
import { AuthComponent } from './auth/auth.component'
import { AppRoutingModule } from './app-routing.module'
import { DayModalComponent } from './challenges/day-modal/day-modal.component'
import { SharedModule } from '../app/shared/shared.module'

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    AppRoutingModule,
    NativeScriptUISideDrawerModule,
    SharedModule,
  ],
  declarations: [
    AppComponent,
    StackComponent,
    AuthComponent,
    DayModalComponent,
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
  entryComponents: [DayModalComponent],
})
export class AppModule {}
