import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { BattletagService } from './../../services/battletag.service';
import { GamesService } from './../../services/api/games.service';
import { NewGameService } from './../../services/newGame.service';

import { Subscription }   from 'rxjs/Subscription';

@Component({
    moduleId: module.id.replace("/dist/", "/"),
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.css'],
    providers: [ GamesService ]
})

export class DashboardComponent implements OnInit {
    battletag: {id: string, tag: string};
    battletagSubscription: Subscription;
    newGameSubscription: Subscription;
    games: any;

    constructor(
      private battletagService: BattletagService,
      private gamesService: GamesService,
      private newGameService : NewGameService
    ) {}

    ngOnInit() {
      this.battletagSubscription = this.battletagService.battletag$.subscribe(
          (battletag: {id: string, tag: string}) => { this.onUpdateBattletag(battletag); }
      );
      this.newGameSubscription = this.newGameService.newGameTagId$.subscribe(
          (battletagId: string) => { this.onNewGame(battletagId); }
      );
    }

    getGames() {
        this.gamesService.getFullInfoGames(this.battletag.id).subscribe(
          games =>  { this.games = games },
          error => console.error(error.toString())
      );
    }

    onNewGame(battletagId: string) {
        if (battletagId === this.battletag.id) {
            this.gamesService.getLastGame(battletagId).subscribe(
                game => {
                    let games = this.games.slice(0); //Create a new array to trigger ngOnChanges
                    games.unshift(game[0]);
                    this.games = games;
                 },
                error => console.error(error.toString())
            );
        }
    }

    onUpdateBattletag(battletag: {id: string, tag: string}) {
        console.log(battletag);
        this.battletag = battletag;
        this.getGames();
    }

    ngOnDestroy() {
        // prevent memory leak when component destroyed
        this.battletagSubscription.unsubscribe();
        this.newGameSubscription.unsubscribe();
    }
}
