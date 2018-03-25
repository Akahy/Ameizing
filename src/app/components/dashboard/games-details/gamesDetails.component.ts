import { Component, Input, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

import { HeroSelectionComponent } from './hero-selection/heroSelection.component';

import { DataService } from './../../../services/api/data.service';
import { GamesService } from './../../../services/api/games.service';
import { NewGameService } from './../../../services/newGame.service';

import * as tippy from 'tippy.js';

@Component({
    selector: 'games-details',
    templateUrl: './games-details.html',
    providers: [ DataService, GamesService ],
    styleUrls: [ './games-details.sass', './table-cols.sass']
})

export class GamesDetailsComponent implements OnChanges {

    @Input() games:any;
    @Input() playerId: string;

    newGameNb: number;
    editedGame: number;

    constructor (
        private dataService: DataService,
        private gamesService: GamesService,
        private newGameService: NewGameService
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        if(changes['games'] && this.games.length > 0) {
            this.newGameNb = this.games[0].game_id + 1;
        }
        else {
            this.newGameNb = 1;
        }
    }

    editGame(gameId: number) {
        this.editedGame = gameId;
    }
}
