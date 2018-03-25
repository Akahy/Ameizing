import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { DataService } from './../../../../services/api/data.service';


@Component({
    selector: 'hero-selection',
    templateUrl: './hero-selection.html',
    providers: [ DataService ],
    styleUrls: [ './hero-selection.css']
})

export class HeroSelectionComponent implements OnInit {
    @Output() heroClicked = new EventEmitter<{id: string, name: string}>();
    @Input() preselectedHeroes: any;

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

        if (this.preselectedHeroes) {
            for(let hero of this.preselectedHeroes) {
                for(let type of this.types) {
                    let element = this.heroesByType[type].find(h =>
                        h.id === hero.hero.id
                    );
                    if (element) {
                        element.selected = true;
                    }
                }
            }
        }
    }

    selectHero(type: string, index: number) {
        let hero = this.heroesByType[type][index];
        this.heroesByType[type][index].selected = !hero.selected;
        this.heroClicked.emit({id: hero.id, name: hero.name});
    }

    unselectAll() {
        for(let type of this.types) {
            this.heroesByType[type].map(hero => hero.selected = false);
        }
    }
}
