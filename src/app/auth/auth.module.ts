import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { AuthComponent } from './auth.component'
import { SharedModule } from '../shared/shared.module'
import {
  NativeScriptCommonModule,
  NativeScriptFormsModule,
  NativeScriptRouterModule,
} from '@nativescript/angular'

@NgModule({
  declarations: [AuthComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule.forChild([
      {
        path: '',
        component: AuthComponent,
      },
    ]),
    NativeScriptFormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AuthModule {}
