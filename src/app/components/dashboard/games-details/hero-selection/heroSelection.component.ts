import { Component, OnInit } from '@angular/core';

import { DataService } from './../../../../services/api/data.service';


@Component({
    moduleId: module.id.replace("/dist/", "/"),
    selector: 'hero-selection',
    templateUrl: './hero-selection.html',
    providers: [ DataService ],
    // styleUrls: [ './hero-selection.css']
})

export class HeroSelectionComponent implements OnInit {
  heroes: any = [];
  heroesByType: any[] = [];
  test = "hello world";

  constructor (private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getHeroes()
    .subscribe(
      heroes =>  { this.heroes = heroes; this.initHeroes(); },
      error => console.log(error.toString())
    )
  }

  initHeroes() {
    for(let hero of this.heroes) {
      if (!this.heroesByType.hasOwnProperty(hero.type)) {
        this.heroesByType[hero.type] = [];
      }
      this.heroesByType[hero.type].push(hero.name);
    }
    console.table(this.heroesByType);
  }
}