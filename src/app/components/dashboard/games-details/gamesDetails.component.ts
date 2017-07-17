import { Component, Input, Output, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { DataService } from './../../../services/api/data.service';
import { GamesService } from './../../../services/api/games.service';

declare var tippy: any;

@Component({
    moduleId: module.id.replace("/dist/", "/"),
    selector: 'games-details',
    templateUrl: './games-details.html',
    providers: [ DataService, GamesService ],
    styleUrls: [ './games-details.css']
})

export class GamesDetailsComponent implements OnChanges, OnInit {
    @Input() games:any;
    @Input() playerId: string;
    maps: any = [];
    heroes: any = [];
    selectedMap: any;
    newGameNb: number;
    isValid: boolean = true;
    newRank: string;
    // heroesByType = [];
    test = "Hello world";

    constructor (
        private dataService: DataService,
        private gamesService: GamesService) {}

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
            //   console.table(this.games);
            this.newGameNb = this.games[0] + 1;
        }
        else {
            this.newGameNb = 1;
        }
    }

    addGame() {
        if (Number(this.newRank) === NaN || Number(this.newRank) > 5000) {
            this.isValid = false;
        }
        else {
            this.isValid = true;
            this.gamesService.postGame(
                this.newGameNb,
                this.playerId,
                Number(this.newRank),
                this.selectedMap
            ).subscribe(
                response => console.log(response),
                error => console.error(error)
            )

        }
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
