import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { GamesService } from './../../services/api/games.service';
import { BattletagService } from './../../services/Battletag.service';
import { Subscription }   from 'rxjs/Subscription';

@Component({
    moduleId: module.id.replace("/dist/", "/"),
    templateUrl: './dashboard.html',
    providers: [ GamesService ]
})

export class DashboardComponent implements OnInit {
    battletag: string;
    subscription: Subscription;
    games: any;

    constructor(
      private battletagService: BattletagService,
      private gamesService: GamesService
    ) {}

    ngOnInit() {
      this.subscription = this.battletagService.battletag$.subscribe(
          (tag: string) => { this.onUpdate(tag) }
      );
    }

    getGames() {
        this.gamesService.getFullInfoGames("92e4c6ee-b76f-410d-b657-fd640a1aa5ae")
        .subscribe(
          games =>  { this.games = games; console.table(this.games)},
          error => console.log(error.toString())
        )
    }

    onUpdate(tag: string) {
        this.battletag = tag;
        this.getGames();
    }

    ngOnDestroy() {
        // prevent memory leak when component destroyed
        this.subscription.unsubscribe();
    }
}
