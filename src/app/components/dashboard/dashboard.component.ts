import { Component, Input, OnDestroy } from '@angular/core';

import { BattletagService } from './../../services/Battletag.service';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  templateUrl: './dashboard.html'
})

export class DashboardComponent {
  component: string;
  @Input() battletag: string;
  subscription: Subscription;
  constructor(private battletagService: BattletagService) {
    this.subscription = battletagService.battletag$.subscribe(
      (tag: string) => { this.onUpdate(tag) }
    );
    this.component = 'Dashboard'
  }

  onUpdate(tag: string) {
    this.battletag = tag;
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
