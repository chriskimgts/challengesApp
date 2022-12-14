import { Injectable } from '@angular/core'
import { CanLoad, Route, UrlSegment } from '@angular/router'
import { RouterExtensions } from '@nativescript/angular'
import { Observable, of, switchMap, take, tap } from 'rxjs'
import { AuthService } from './auth.service'

@Injectable()
export class AuthGard implements CanLoad {
  constructor(
    private authService: AuthService,
    private router: RouterExtensions,
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[],
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.authService.user.pipe(
      take(1),
      switchMap((currentUser) => {
        if (!currentUser || !currentUser.token) {
          return this.authService.autoLogin()
        }
        return of(true)
      }),
      tap((isAuth) => {
        if (!isAuth) {
          this.router.navigate(['/auth'])
        }
      }),
    )
  }
}
