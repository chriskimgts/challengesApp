import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-challenge-actions',
  templateUrl: './challenge-actions.component.html',
  styleUrls: ['./challenge-actions.component.scss'],
})
export class ChallengeActionsComponent implements OnInit {
  @Output() actionSelect = new EventEmitter<'complete' | 'fail' | 'cancel'>()
  @Input() cancelText = 'Cancel'
  constructor() {}

  ngOnInit(): void {}

  onAction(action: 'complete' | 'fail' | 'cancel') {
    this.actionSelect.emit(action)
  }
}
