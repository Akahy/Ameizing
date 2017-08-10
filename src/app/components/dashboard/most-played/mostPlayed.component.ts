import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { OverwatchService } from './../../../services/api/overwatch.service';

@Component({
    selector: 'most-played',
    templateUrl: './most-played.html',
    providers: [ OverwatchService ],
    styleUrls: [ './most-played.css']
})

export class MostPlayedComponent implements OnChanges {
    @Input() tag: string;
    playtimes: any[] = [];

    constructor ( private overwatchService: OverwatchService ) {}

    ngOnChanges(changes: SimpleChanges) {
        if(changes['tag']) {
            this.playtimes = [];
            this.getPlaytime();
        }
    }

    sortPlaytime(playtime: any) {
        this.playtimes = Object.keys(playtime)
            .map(key => {
                return {hero: key, time: Math.round((playtime[key] + 0.00001) * 10) / 10};
            })
            .sort((a,b) => b.time - a.time)
            .slice(0,6);
    }

    getPlaytime() {
        this.overwatchService.getHeroesInformations(this.tag)
            .subscribe(
                res => this.sortPlaytime(res.eu.heroes.playtime.competitive),
                error => console.error(error)
            );
    }
}
