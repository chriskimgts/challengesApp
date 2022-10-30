import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { RouterExtensions } from '@nativescript/angular'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  constructor(private router: RouterExtensions) {}

  ngOnInit(): void {}

  onTap() {
    this.router.navigate(['/challenges'], { clearHistory: true })
  }
}
