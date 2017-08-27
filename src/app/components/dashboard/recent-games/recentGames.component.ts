import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'recent-games',
    templateUrl: './recent-games.html',
    styleUrls: [ './recent-games.css']
})

export class RecentGamesComponent implements OnChanges {
    @Input() games:any;
    lastGamesInfos: {rating: number, variation: number, outcome: string }[];

    ngOnChanges(changes: SimpleChanges) {
        if(changes['games'] && this.games.length > 0) {
            this.lastGamesInfos = this.games.slice(0,8);
        }
        else {
            this.lastGamesInfos = [];
        }
    }
}
