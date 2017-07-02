import { Component } from '@angular/core';
import { BattletagService } from './services/Battletag.service';

@Component({
    selector: 'my-app',
    template: `<top-menu></top-menu>`,
    providers: [ BattletagService ]
})
export class AppComponent  {}
