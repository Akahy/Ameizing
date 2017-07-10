import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    moduleId: module.id.replace("/dist/", "/"),
    selector: 'games-details',
    templateUrl: './games-details.html',
    // styleUrls: [ './games-details.css']
})

export class GamesDetailsComponent implements OnChanges {
  @Input() games:any;
  lastGamesInfos: {rating: number, variation: number, outcome: string }[];

  ngOnChanges(changes: SimpleChanges) {
    if(changes['games']) {
      console.log(this.games);
      this.lastGamesInfos = this.games.slice(0,4);
    }
  }
}
