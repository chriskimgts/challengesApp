import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { ChallengeTabsComponent } from './challenge-tabs/challenge-tabs.component'
import { TodayComponent } from './today/today.component'
import { CurrentChallengeComponent } from './current-challenge/current-challenge.component'

const routes: Routes = [
  {
    path: 'tabs',
    component: ChallengeTabsComponent,
    children: [
      { path: 'today', component: TodayComponent, outlet: 'today' },
      {
        path: 'current-challenge',
        component: CurrentChallengeComponent,
        outlet: 'currentChallenge',
      },
    ],
  },
  {
    path: ':mode',
    loadChildren: () =>
      import('./challenge-edit/challenge-edit.module').then(
        (x) => x.ChallengeEditModule,
      ),
  },
  { path: '', redirectTo: '/challenges/tabs', pathMatch: 'full' },
]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class ChallengesRoutingModule {}
