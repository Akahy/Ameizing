import { Component, Input, Output, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

import { HeroSelectionComponent } from './hero-selection/heroSelection.component';

import { DataService } from './../../../services/api/data.service';
import { GamesService } from './../../../services/api/games.service';
import { NewGameService } from './../../../services/newGame.service';

import * as tippy from 'tippy.js';

@Component({
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
    mapTypes: any = [];
    heroes: any = [];
    //Form input
    selectedMap: any = GamesDetailsComponent.DEFAULT_MAP;
    selectedHeroes: {id: string, name: string}[] = [];
    newGameNb: number;
    newRank: number;
    //Form control
    isLoading: boolean = false;
    webServiceError: boolean = false;

    @ViewChild(HeroSelectionComponent)
    private heroSelectionComponent: HeroSelectionComponent;

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
            duration: 200,
            arrow: true,
            theme: 'light'
        });

        this.dataService.getMaps()
        .subscribe(
            maps =>  { this.maps = maps; },
            error => console.error(error.toString())
        )

        this.dataService.getMapTypes()
        .subscribe(
            types => this.mapTypes = types,
            error => console.error(error.toString())
        )
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

    heroSelected(hero: {id: string, name: string}) {
        let index = this.selectedHeroes.map(h => h.id).indexOf(hero.id);
        if (index > -1) {
            this.selectedHeroes.splice(index, 1);
        }
        else {
            this.selectedHeroes.push(hero);
        }
    }

    addGame() {
        console.log("pourt");
        this.isLoading = true;
        let map = this.selectedMap === "None" ? null : this.selectedMap.id;
        this.gamesService.postGame(
            this.newGameNb,
            this.playerId,
            this.newRank,
            map
        ).subscribe(
            response => {
                this.gamesService.postGameHeroes(response[0].id, this.selectedHeroes.map(hero => hero.id) )
                .subscribe(
                    response => {
                        this.newGameService.setNewGameTagId(this.playerId);
                        this.resetForm();
                    },
                    error => console.error(error)
                )
            },
            error => {
                this.isLoading = false;
                this.webServiceError = true;
                console.error(error)
            }
        )
    }

    inRange() {
        return (this.newRank > 0 && this.newRank <= 5000)
    }

    resetForm() {
        this.selectedMap = GamesDetailsComponent.DEFAULT_MAP;
        if (this.selectedHeroes.length > 0) {
            this.heroSelectionComponent.unselectAll();
        }
        this.selectedHeroes = [];
        this.newRank = null;
        this.isLoading = false;
        this.webServiceError = false;
    }

    getMaps(id: any) {
        return this.maps.filter(map => map.game_mode.id==id);
    }
}
