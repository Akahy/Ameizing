import { Component, OnInit, NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';

import { BattletagService } from './../../services/battletag.service';
import { PlayersService} from './../../services/api/players.service';

@Component({
    moduleId: module.id.replace("/dist/", "/"),
    selector: 'top-menu',
    templateUrl: './top-menu.html',
    styleUrls:  [ './top-menu.css'],
    providers: [ PlayersService ]
})

export class TopMenuComponent implements OnInit {
    selectedBattletag: {id: string, tag: string};
    battletags: {id: string, tag: string}[] = [];

    constructor(
        private battletagService: BattletagService,
        private playersService: PlayersService ) {
    }

    ngOnInit() {
        this.playersService.getPlayers().subscribe (
            players => this.initBattletag(players),
            error => console.error(error.toString())
        )
    }

    initBattletag(players: {id: string, tag: string}[]) {
        console.table(players);
        this.battletags = players;
        if (players.length > 0) {
            this.selectedBattletag = players[0];
        }
        this.updateBattletag();
    }

    updateBattletag() {
        this.battletagService.setBattletag(this.selectedBattletag);
    }
}
