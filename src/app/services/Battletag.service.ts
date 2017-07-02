import { Injectable } from '@angular/core';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';

import { battletags } from './../resources/battletag.config';

@Injectable()
export class BattletagService {
    //Observable string source
    private battletag = new BehaviorSubject<string>(battletags[0]);

    //Observable string stream
    battletag$ = this.battletag.asObservable();

    setBattletag(tag: string) {
        this.battletag.next(tag);
    }
}
