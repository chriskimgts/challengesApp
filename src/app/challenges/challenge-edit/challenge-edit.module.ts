import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import {
  NativeScriptCommonModule,
  NativeScriptFormsModule,
} from '@nativescript/angular'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { ChallengeEditComponent } from './challenge-edit.component'
import { SharedModule } from '../../shared/shared.module'

@NgModule({
  declarations: [ChallengeEditComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    // NativeScriptRouterModule,
    NativeScriptRouterModule.forChild([
      { path: '', component: ChallengeEditComponent },
    ]),
    SharedModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ChallengeEditModule {}
