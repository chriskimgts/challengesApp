import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core'
import { ModalDialogService } from '@nativescript/angular'
import { UIService } from '~/app/shared/ui.service'
import { DayModalComponent } from '../day-modal/day-modal.component'
import { ChallengeService } from '../challenge.service'
import { Challenge } from '../challenge.model'
import { Subscription } from 'rxjs'
import { Day, DayStatus } from '../day.model'

@Component({
  selector: 'ns-current-challenge',
  templateUrl: './current-challenge.component.html',
  styleUrls: [
    '_current-challenge.component.common.scss',
    './current-challenge.component.android.scss',
    './current-challenge.component.ios.scss',
  ],
})
export class CurrentChallengeComponent implements OnInit, OnDestroy {
  weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  currentChallenge: Challenge
  days: { dayInMonth: number; dayInWeek: number }[] = []
  private curChallengeSub: Subscription
  constructor(
    private modalDialog: ModalDialogService,
    private vcRef: ViewContainerRef,
    private uiService: UIService,
    private challengeService: ChallengeService,
  ) {}

  ngOnInit(): void {
    this.curChallengeSub = this.challengeService.currentChallenge.subscribe(
      (challenge) => {
        this.currentChallenge = challenge
      },
    )
  }

  getIsSettable(dayInMonth: number) {
    return dayInMonth <= new Date().getDate()
  }
  getRow(index: number, day: { dayInMonth: number; dayInWeek: number }) {
    const startRow = 1
    const weekRow = Math.floor(index / 7)
    const firstWeekDayOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1,
    ).getDay()
    const irregularRow = day.dayInWeek < firstWeekDayOfMonth ? 1 : 0
    return startRow + weekRow + irregularRow
  }
  onChangeStatus(day: Day) {
    if (!this.getIsSettable(day.dayInMonth)) {
      return
    }
    this.modalDialog
      .showModal(DayModalComponent, {
        fullscreen: true,
        viewContainerRef: this.uiService.getRootVCRef()
          ? this.uiService.getRootVCRef()
          : this.vcRef,
        context: { date: new Date(day.date), status: day.status },
      })
      .then((status: DayStatus) => {
        if (status === DayStatus.Open) {
          return
        }
        this.challengeService.updateDayStatus(day.dayInMonth, status)
      })
  }

  ngOnDestroy(): void {
    if (this.curChallengeSub) {
      this.curChallengeSub.unsubscribe()
    }
  }
}
