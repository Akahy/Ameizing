import { Component, OnInit, NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';

import { BattletagService } from './../../services/battletag.service';
import { LocalStorageService } from './../../services/localStorage.service';
import { PlayersService} from './../../services/api/players.service';

@Component({
    selector: 'top-menu',
    templateUrl: './top-menu.html',
    styleUrls:  [ './top-menu.sass'],
    providers: [ PlayersService ]
})

export class TopMenuComponent implements OnInit {
    selectedBattletag: {id: string, tag: string};
    battletags: {id: string, tag: string}[] = [];
    isMobileMenuOpen: boolean = false;

    constructor(
        private battletagService: BattletagService,
        private localStorageService : LocalStorageService,
        private playersService: PlayersService ) {
    }

    ngOnInit() {
        this.playersService.getPlayers().subscribe (
            players => this.initBattletag(players),
            error => console.error(error.toString())
        )
    }

    initBattletag(players: {id: string, tag: string}[]) {
        // console.table(players);
        this.battletags = players;
        let battletag = this.localStorageService.get('battletag');
        let battletagIndex = battletag ? this.battletags.findIndex(b => b.id === battletag.id) : -1;
        if (battletagIndex > -1) {
            this.selectedBattletag = this.battletags[battletagIndex];
        }
        else if (this.battletags.length > 0) {
            this.selectedBattletag = this.battletags[0];
        }
        this.updateBattletag();
    }

    updateBattletag() {
        this.localStorageService.save('battletag', this.selectedBattletag);
        this.battletagService.setBattletag(this.selectedBattletag);
    }

    toggleMobileMenu() {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
    }
}
