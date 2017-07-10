import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { DataService } from './../../../services/api/data.service';

@Component({
    moduleId: module.id.replace("/dist/", "/"),
    selector: 'games-details',
    templateUrl: './games-details.html',
    providers: [ DataService ],
    styleUrls: [ './games-details.css']
})

export class GamesDetailsComponent implements OnChanges, OnInit {
  @Input() games:any;
  maps: any = [];
  heroes: any = [];
  selectedMap: any;
  addGameId: number;
  isValid: boolean = false;
  newRank: string;

  constructor (private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getMaps()
    .subscribe(
      maps =>  { this.maps = maps; this.selectedMap = maps[0]; },
      error => console.log(error.toString())
    )
    this.dataService.getHeroes()
    .subscribe(
      heroes =>  { this.heroes = heroes },
      error => console.log(error.toString())
    )
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['games']) {
      console.table(this.games);
      this.addGameId = this.games[0] + 1;
    }
  }

  newRankChange() { //FIXME
    if (Number(this.newRank) !== NaN) {
      this.isValid = Number(this.newRank) < 5000;
    }
    this.isValid = false;
    console.log(Number(this.newRank));
  }
}
