import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class BattletagService {
    //Observable string source
    private battletag = new Subject<{id: string, tag: string}>();

    //Observable string stream
    battletag$ = this.battletag.asObservable();

    setBattletag(battletag: {id: string, tag: string}) {
        this.battletag.next(battletag);
    }
}
