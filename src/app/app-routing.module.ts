import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'
import { AuthComponent } from './auth/auth.component'
import { AuthGard } from './auth/auth.gard'

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((x) => x.AuthModule),
  },
  {
    path: 'challenges',
    loadChildren: () =>
      import('./challenges/challenges.module').then((x) => x.ChallengesModule),
    canLoad: [AuthGard],
  },
  { path: '', redirectTo: '/challenges/tabs', pathMatch: 'full' },
]
@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
  providers: [AuthGard],
})
export class AppRoutingModule {}
