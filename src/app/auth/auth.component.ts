import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { RouterExtensions } from '@nativescript/angular'
import { TextField } from '@nativescript/core/ui/text-field'
import { AuthService } from './auth.service'
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  form: FormGroup
  emailControlIsValid = true
  passwordControlValid = true
  isLogin = true
  isLoading = false
  @ViewChild('passwordEl')
  passwordEl: ElementRef<TextField>
  @ViewChild('emailEl') emailEl: ElementRef<TextField>
  constructor(
    private router: RouterExtensions,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(6)],
      }),
    })
    this.form.get('email').statusChanges.subscribe((status) => {
      this.emailControlIsValid = status === 'VALID'
    })
    this.form.get('password').statusChanges.subscribe((status) => {
      this.passwordControlValid = status === 'VALID'
    })
  }

  onDone() {
    this.emailEl.nativeElement.focus()
    this.passwordEl.nativeElement.focus()
    this.passwordEl.nativeElement.dismissSoftInput()
  }
  onSubmit() {
    this.emailEl.nativeElement.focus()
    this.passwordEl.nativeElement.focus()
    this.passwordEl.nativeElement.dismissSoftInput()
    if (!this.form.valid) {
      return
    }
    const email = this.form.get('email').value
    const password = this.form.get('password').value
    this.form.reset()
    console.log(email, password)
    this.emailControlIsValid = true
    this.passwordControlValid = true
    this.isLoading = true
    if (this.isLogin) {
      this.authService.login(email, password).subscribe(
        (resData) => {
          this.isLoading = false
          this.router.navigate(['/challenges'], { clearHistory: true })
          console.log(resData)
        },
        (err) => {
          this.isLoading = false
          console.log(err)
        },
      )
      console.log('login')
    } else {
      this.authService.signUp(email, password).subscribe(
        (resData) => {
          this.isLoading = false
          this.router.navigate(['/challenges'], { clearHistory: true })
          console.log(resData)
        },
        (err) => {
          this.isLoading = false
          console.log(err)
        },
      )
      console.log('signup')
    }
  }
  onSwith() {
    this.isLogin = !this.isLogin
  }
}
