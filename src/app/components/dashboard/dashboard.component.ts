import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { GamesService } from './../../services/api/games.service';
import { BattletagService } from './../../services/Battletag.service';
import { Subscription }   from 'rxjs/Subscription';

@Component({
    moduleId: module.id.replace("/dist/", "/"),
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.css'],
    providers: [ GamesService ]
})

export class DashboardComponent implements OnInit {
    battletag: {id: string, tag: string};
    subscription: Subscription;
    games: any;

    constructor(
      private battletagService: BattletagService,
      private gamesService: GamesService
    ) {}

    ngOnInit() {
      this.subscription = this.battletagService.battletag$.subscribe(
          (battletag: {id: string, tag: string}) => { this.onUpdate(battletag); }
      );
    }

    getGames() {
        this.gamesService.getFullInfoGames(this.battletag.id)
        .subscribe(
          games =>  { this.games = games },
          error => console.log(error.toString())
        )
    }

    onUpdate(battletag: {id: string, tag: string}) {
        console.log(battletag);
        this.battletag = battletag;
        this.getGames();
    }

    ngOnDestroy() {
        // prevent memory leak when component destroyed
        this.subscription.unsubscribe();
    }
}
