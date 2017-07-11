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
  isValid: boolean = true;
  newRank: string;

  constructor (private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getMaps()
    .subscribe(
      maps =>  { this.maps = maps },
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

  addGame() {
    if (Number(this.newRank) === NaN || Number(this.newRank) > 5000) {
      this.isValid = false;
    }
    else {
      this.isValid = true;
      //TODO post game
    }
  }
}
