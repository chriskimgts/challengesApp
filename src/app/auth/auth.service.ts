import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { User } from './user.model'
import { alert } from '@nativescript/core'
import { BehaviorSubject, catchError, of, tap, throwError } from 'rxjs'
import { RouterExtensions } from '@nativescript/angular'
import {
  getString,
  hasKey,
  remove,
  setString,
} from '@nativescript/core/application-settings'
import { ChallengeService } from '../challenges/challenge.service'

const FIRBAISE_API_KEY = 'AIzaSyD38CQW5U7Ou5qdV1_4mAtq_JSID8Hg4vg'

interface AuthResponseData {
  kind: string
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
  registered?: boolean
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = new BehaviorSubject<User>(null)
  private tokenEenExpirationTimer: NodeJS.Timeout
  constructor(private http: HttpClient, private router: RouterExtensions) {}

  get user() {
    return this._user.asObservable()
  }

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIRBAISE_API_KEY}`,
        { email: email, password: password, returnSecureToken: true },
      )
      .pipe(
        catchError((errorRes) => {
          this.handleError(errorRes.error.error.message)
          return throwError(() => errorRes.error.error.message)
        }),
        tap((resData) => {
          if (resData && resData.idToken) {
            const expirationDate = new Date(
              new Date().getTime() + parseInt(resData.expiresIn) * 1000,
            )
            const user = new User(
              email,
              resData.localId,
              resData.idToken,
              expirationDate,
            )
            this._user.next(user)
          }
        }),
      )
  }
  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIRBAISE_API_KEY}`,
        { email: email, password: password, returnSecureToken: true },
      )
      .pipe(
        catchError((errorRes) => {
          this.handleError(errorRes.error.error.message)
          return throwError(() => errorRes.error.error.message)
        }),
        tap((resData) => {
          if (resData && resData.idToken) {
            this.handleLogin(
              email,
              resData.idToken,
              resData.localId,
              parseInt(resData.expiresIn),
            )
          }
        }),
      )
  }

  private handleLogin(
    email: string,
    token: string,
    userId: string,
    expiresIn: number,
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(email, userId, token, expirationDate)
    setString('userData', JSON.stringify(user))
    this.autoLogout(user.timeToExpiry)
    this._user.next(user)
  }
  private handleError(errorMessage: string) {
    switch (errorMessage) {
      case 'EMAIL_EXIST':
        alert(`this email doesn't exist`)
        break
      case 'INVALID_PASSWORD':
        alert(`invalid password`)
      default:
        alert(`Auth failed, check your credential`)
    }
  }
  autoLogin() {
    if (!hasKey('userData')) {
      return of(false)
    }
    const userData: {
      email: string
      id: string
      _token: string
      _tokenExperationData: string
    } = JSON.parse(getString('userData'))
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExperationData),
    )
    if (loadedUser.isAuth) {
      this._user.next(loadedUser)
      this.autoLogout(loadedUser.timeToExpiry)
      return of(true)
    }
    return of(false)
  }
  autoLogout(expiryDuration: number) {
    this.tokenEenExpirationTimer = setTimeout(
      () => this.logout(),
      expiryDuration,
    )
  }
  logout() {
    this._user.next(null)
    remove('userData')
    if (this.tokenEenExpirationTimer) {
      clearTimeout(this.tokenEenExpirationTimer)
    }
    this.router.navigate(['/auth'], { clearHistory: true })
  }
}
