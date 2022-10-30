import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular'
import { Subscription } from 'rxjs'
import { UIService } from './shared/ui.service'

@Component({
  selector: 'ns-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(RadSideDrawerComponent) drawerComponent: RadSideDrawerComponent
  activeChallenge = ''
  private drawerSub: Subscription
  private drawer: RadSideDrawer
  constructor(
    private uiService: UIService,
    private changeDetectionRef: ChangeDetectorRef,
    private vcRef: ViewContainerRef,
  ) {}
  ngOnInit(): void {
    this.drawerSub = this.uiService.drawerState.subscribe(() => {
      if (this.drawer) {
        this.drawerComponent.sideDrawer.toggleDrawerState()
      }
    })
    this.uiService.setRootVCRef(this.vcRef)
  }
  ngAfterViewInit(): void {
    this.drawer = this.drawerComponent.sideDrawer
    this.changeDetectionRef.detectChanges()
  }
  onChallengeInput(challengeDescription: string) {
    this.activeChallenge = challengeDescription
  }
  onLogout() {
    this.uiService.toggleDrawer()
  }
  ngOnDestroy(): void {
    if (this.drawerSub) {
      this.drawerSub.unsubscribe()
    }
  }
}
