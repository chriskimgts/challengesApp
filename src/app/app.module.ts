import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import {
  NativeScriptHttpClientModule,
  NativeScriptModule,
} from '@nativescript/angular'
import { NativeScriptFormsModule } from '@nativescript/angular'
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular'

import { AppComponent } from './app.component'
import { AuthComponent } from './auth/auth.component'
import { AppRoutingModule } from './app-routing.module'
import { DayModalComponent } from './challenges/day-modal/day-modal.component'
import { SharedModule } from '../app/shared/shared.module'
import { ChallengeActionsModule } from './challenges/challenge-actions/challenge-actions.module'
import { ReactiveFormsModule } from '@angular/forms'
import { TodayComponent } from './challenges/today/today.component'
@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpClientModule,
    NativeScriptUISideDrawerModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    ChallengeActionsModule,
  ],
  declarations: [AppComponent, AuthComponent, DayModalComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
  entryComponents: [DayModalComponent],
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {}
