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
    @Input() isSelectable: boolean = false;
    @Input() selected: boolean = false;
}
