import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { ChallengeService } from '../challenge.service'
import { Day, DayStatus } from '../day.model'

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss'],
  moduleId: module.id,
})
export class TodayComponent implements OnInit, OnDestroy {
  currentDay: Day
  private curChallengeSub: Subscription

  constructor(private challengeService: ChallengeService) {}

  ngOnInit() {
    this.curChallengeSub = this.challengeService.currentChallenge.subscribe(
      (challenge) => {
        if (challenge) {
          this.currentDay = challenge.currentDay
        }
      },
    )
  }

  updateStatus(action: DayStatus) {
    // if (action) {
    console.log(action)
    this.challengeService.updateDayStatus(this.currentDay.dayInMonth, action)
    // }
  }

  getActionName() {
    if (this.currentDay.status === DayStatus.Completed) {
      return 'complete'
    }
    if (this.currentDay.status === DayStatus.Failed) {
      return 'fail'
    }
    return null
  }

  ngOnDestroy() {
    if (this.curChallengeSub) {
      this.curChallengeSub.unsubscribe()
    }
  }
}
