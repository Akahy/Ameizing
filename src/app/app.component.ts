import { Component } from '@angular/core';
import { BattletagService } from './services/battletag.service';
import { NewGameService } from './services/newGame.service';

@Component({
    selector: 'app-root',
    template: `<top-menu></top-menu>`,
    providers: [
        BattletagService,
        NewGameService
    ]
})
export class AppComponent  {}
