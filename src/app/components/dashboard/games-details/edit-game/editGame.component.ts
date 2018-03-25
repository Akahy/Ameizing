import { Component, EventEmitter, Input, Output, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

import { HeroSelectionComponent } from './../hero-selection/heroSelection.component';

import { DataService } from './../../../../services/api/data.service';
import { GamesService } from './../../../../services/api/games.service';
import { NewGameService } from './../../../../services/newGame.service';

import * as tippy from 'tippy.js';

@Component({
    selector: 'edit-game',
    templateUrl: './edit-game.html',
    providers: [ DataService, GamesService ],
    styleUrls: [ './edit-game.sass', './../table-cols.sass']
})

export class EditGameComponent implements OnChanges, OnInit {
    static readonly DEFAULT_MAP = "None";

    @Output() cancelEdition = new EventEmitter<any>();

    @Input() gameId:any;
    @Input() playerId: string;

    // Edit input
    @Input() edit: boolean = false;
    @Input() rank: number;
    @Input() gameMap: any;
    @Input() gameHeroes: any;

    // Datas
    mapsByType: any = [];
    mapTypes: any = [];

    // Form input
    selectedMap: any = EditGameComponent.DEFAULT_MAP;
    selectedHeroes: {id: string, name: string}[] = [];
    newRank: number;
    // Form control
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
        tippy(".hero-tooltip", {
            html: document.querySelector('.tooltip-template'),
            trigger: 'click',
            interactive: true,
            position: 'top',
            animation: 'scale',
            duration: 200,
            arrow: true,
            theme: 'light'
        });

        this.dataService.getMaps().subscribe(
            maps => this.initMaps(maps),
            error => console.error(error.toString())
        );

        this.dataService.getMapTypes().subscribe(
            types => this.mapTypes = types,
            error => console.error(error.toString())
        );
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['playerId']) {
            this.resetForm();
        }
        if (changes['rank']) {
            this.newRank = this.rank;
        }
        if (changes['gameHeroes']) {
            for (let hero of this.gameHeroes) {
                this.selectedHeroes.push({
                    id: hero.hero.id,
                    name: hero.hero.slug
                })
            }
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
        this.isLoading = true;
        let map = this.selectedMap === "None" ? null : this.selectedMap.id;
        this.gamesService.postGame(
            this.gameId,
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

    editGame() {
        console.log("TODO with new API else it will launch a nuclear bomb");
    }

    inRange() {
        return (this.newRank > 0 && this.newRank <= 5000)
    }

    resetForm() {
        this.selectedMap = EditGameComponent.DEFAULT_MAP;
        if (this.selectedHeroes.length > 0) {
            this.heroSelectionComponent.unselectAll();
        }
        this.selectedHeroes = [];
        this.newRank = null;
        this.isLoading = false;
        this.webServiceError = false;
    }

    cancelEdit() {
        this;this.cancelEdition.emit();
    }

    initMaps(maps: any) {
        for(let map of maps) {
            if (!this.mapsByType[map.game_mode.id]) {
                this.mapsByType[map.game_mode.id] = [];
            }
            this.mapsByType[map.game_mode.id].push(map);
        }
        if (this.gameMap) {
            let index = this.mapsByType[this.gameMap.game_mode_id].find( map =>
                map.id === this.gameMap.id
            );
            this.selectedMap = index ? index : EditGameComponent.DEFAULT_MAP;
        }
    }
}
