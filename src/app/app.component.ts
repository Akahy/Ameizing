import { Component } from '@angular/core';
import { BattletagService } from './services/battletag.service';

@Component({
    selector: 'app-root',
    template: `<top-menu></top-menu>`,
    providers: [ BattletagService ]
})
export class AppComponent  {}
