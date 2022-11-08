import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss'],
})
export class TodayComponent implements OnInit {
  isHighlighted = false
  constructor() {}

  ngOnInit(): void {
    const foo = ''
  }
  onDemo() {
    this.isHighlighted = !this.isHighlighted
  }
}
