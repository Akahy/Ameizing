import { Component, NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';

import { BattletagService } from './../../services/Battletag.service';
import { battletags } from './../../resources/battletag.config';

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.html',
})

export class TopMenuComponent {
  selectedBattletag:string;
  battletags: string[] = battletags;

  constructor(private battletagService: BattletagService) {
    this.selectedBattletag = this.battletags[0];
  }

  updateBattletag() {
    this.battletagService.setBattletag(this.selectedBattletag);
  }
}
