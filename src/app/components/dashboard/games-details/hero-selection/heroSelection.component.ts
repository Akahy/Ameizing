import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { DataService } from './../../../../services/api/data.service';


@Component({
    moduleId: module.id.replace("/dist/", "/"),
    selector: 'hero-selection',
    templateUrl: './hero-selection.html',
    providers: [ DataService ],
    // styleUrls: [ './hero-selection.css']
})

export class HeroSelectionComponent implements OnInit {
    @Output() heroClicked = new EventEmitter<{id: string, name: string}>();

    heroes: any = [];
    heroesByType: any[] = [];
    types: string[] = [];

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
                this.types.push(hero.type);
            }
            this.heroesByType[hero.type].push({
                'id': hero.id,
                'name': hero.slug,
                'selected': false
            });
        }
    }

    selectHero(type: string, index: number) {
        let hero = this.heroesByType[type][index];
        this.heroesByType[type][index].selected = !hero.selected;
        this.heroClicked.emit({id: hero.id, name: hero.name});
    }
}
