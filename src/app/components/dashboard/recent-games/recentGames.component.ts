import { Component } from '@angular/core';

@Component({
    moduleId: module.id.replace("/dist/", "/"),
    selector: 'recent-games',
    templateUrl: './recent-games.html',
    styleUrls: [ './recent-games.css']
})

export class RecentGamesComponent {
    scoreDiff: any[] = [];
    scores = [
        2120, //Plus récent
        2400,
        2400,
        2300,
        2150,
        2200,
        2230,
        2200,
        2210,
        2210 //Moins récent
    ]

    constructor() {
        for(let i=0; i+1<this.scores.length && i<5; i++) {
            this.scoreDiff.push({
                diff: this.scores[i]-this.scores[i+1],
                score: this.scores[i],
            });
        }
    }
}
