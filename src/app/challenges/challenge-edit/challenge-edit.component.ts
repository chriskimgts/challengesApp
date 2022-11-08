import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PageRoute } from '@nativescript/angular'

@Component({
  selector: 'app-challenge-edit',
  templateUrl: './challenge-edit.component.html',
  styleUrls: ['./challenge-edit.component.scss'],
})
export class ChallengeEditComponent implements OnInit {
  isCreating = true
  constructor(
    private activatedRoute: ActivatedRoute,
    private pageRoute: PageRoute,
  ) {}

  ngOnInit(): void {
    this.pageRoute.activatedRoute.subscribe((activatedRoute) => {
      activatedRoute.paramMap.subscribe((paramMap) => {
        if (!paramMap.has('mode')) {
          this.isCreating = true
        } else {
          this.isCreating = paramMap.get('mode') !== 'edit'
        }
        console.log(paramMap.get('mode'))
      })
    })
  }
}
