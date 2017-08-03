import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id.replace("/dist/", "/"),
    selector: 'hero',
    templateUrl: './hero.html',
    styleUrls: [ './hero.css']
})

export class HeroComponent {
    @Input() name: string = "test";
    @Input() size: string = "s";
    @Input() selected: boolean = false;
}
