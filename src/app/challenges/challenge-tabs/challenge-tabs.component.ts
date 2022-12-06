import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PageRoute, RouterExtensions } from '@nativescript/angular'
import { Page } from '@nativescript/core'
import { ChallengeService } from '../challenge.service'

@Component({
  selector: 'app-challenge-tabs',
  templateUrl: './challenge-tabs.component.html',
  styleUrls: [
    './challenge-tabs.component.ios.css',
    './challenge-tabs.component.android.css',
  ],
})
export class ChallengeTabsComponent implements OnInit {
  isLoading = false
  constructor(
    private router: RouterExtensions,
    private active: ActivatedRoute,
    private page: Page,
    private challengeService: ChallengeService,
  ) {}

  ngOnInit(): void {
    this.isLoading = true
    this.challengeService.fetchCurrentChallenge().subscribe({
      next: (challenge) => {
        console.log('Loading....')
        this.isLoading = false
        this.loadTabRoute()
      },
      error: (err) => {
        console.log(err)
        this.isLoading = false
        this.loadTabRoute()
      },
      complete: () => {},
    })
  }

  loadTabRoute() {
    setTimeout(() => {
      this.router.navigate(
        [
          {
            outlets: {
              currentChallenge: ['current-challenge'],
              today: ['today'],
            },
          },
        ],
        {
          relativeTo: this.active,
        },
      )
      this.page.actionBarHidden = true
    })
  }
}
