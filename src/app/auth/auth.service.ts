import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

const FIRBAISE_API_KEY = 'AIzaSyD38CQW5U7Ou5qdV1_4mAtq_JSID8Hg4vg'
@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}
  signUp(email: string, password: string) {
    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIRBAISE_API_KEY}`,
      { email: email, password: password, returnSecureToken: true },
    )
  }
  login(email: string, password: string) {
    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIRBAISE_API_KEY}`,
      { email: email, password: password, returnSecureToken: true },
    )
  }
}
