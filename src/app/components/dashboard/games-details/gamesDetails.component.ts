import { Component, Input, Output, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { DataService } from './../../../services/api/data.service';
import { GamesService } from './../../../services/api/games.service';
import { NewGameService } from './../../../services/newGame.service';

import * as tippy from 'tippy.js';

@Component({
    moduleId: module.id.replace("/dist/", "/"),
    selector: 'games-details',
    templateUrl: './games-details.html',
    providers: [ DataService, GamesService ],
    styleUrls: [ './games-details.css']
})

export class GamesDetailsComponent implements OnChanges, OnInit {
    static readonly DEFAULT_MAP = "None";
    @Input() games:any;
    @Input() playerId: string;
    maps: any = [];
    heroes: any = [];
    selectedMap: any = GamesDetailsComponent.DEFAULT_MAP;
    newGameNb: number;
    newRank: string;
    //Form control
    isValid: boolean = true;
    isLoading: boolean = false;
    webServiceError: boolean = false;

    // heroesByType = [];

    constructor (
        private dataService: DataService,
        private gamesService: GamesService,
        private newGameService: NewGameService
    ) {}

    ngOnInit() {
        tippy("#tooltip", {
            html: document.querySelector('#tooltip-template'),
            trigger: 'click',
            interactive: true,
            position: 'top',
            animation: 'scale',
            duration: 500,
            arrow: true,
            theme: 'light'
        });

        this.dataService.getMaps()
        .subscribe(
            maps =>  { this.maps = maps },
            error => console.log(error.toString())
        )
        // this.dataService.getHeroes()
        // .subscribe(
        //   heroes =>  { this.heroes = heroes; this.initHeroes(); },
        //   error => console.log(error.toString())
        // )
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes['games'] && this.games.length > 0) {
            this.newGameNb = this.games[0].game_id + 1;
        }
        else {
            this.newGameNb = 1;
        }
        if(changes['playerId']) {
            this.resetForm();
        }
    }

    addGame() {
        if (Number(this.newRank) === NaN || Number(this.newRank) > 5000) {
            this.isValid = false;
        }
        else {
            this.isLoading = true;
            this.isValid = true;
            let map = this.selectedMap === "None" ? null : this.selectedMap.id;
            this.gamesService.postGame(
                this.newGameNb,
                this.playerId,
                Number(this.newRank),
                map
            ).subscribe(
                response => {
                    this.newGameService.setNewGameTagId(this.playerId);
                    this.resetForm();
                },
                error => {
                    this.isLoading = false;
                    this.webServiceError = true;
                    console.error(error)
                }
            )

        }
    }

    resetForm() {
        this.selectedMap = GamesDetailsComponent.DEFAULT_MAP;
        this.newRank = "";
        this.isValid = true;
        this.isLoading = false;
        this.webServiceError = false;
    }

    // initHeroes() {
    //   for(let hero of this.heroes) {
    //     if (!this.heroesByType.hasOwnProperty(hero.type)) {
    //       this.heroesByType[hero.type] = [];
    //     }
    //     this.heroesByType[hero.type].push(hero.name);
    //   }
    //   console.table(this.heroesByType);
    // }
}
