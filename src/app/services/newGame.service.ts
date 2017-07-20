import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class NewGameService {
    //Observable string source
    private newGameTagId = new Subject<string>();

    //Observable string stream
    newGameTagId$ = this.newGameTagId.asObservable();

    setNewGameTagId(tagId: string) {
        this.newGameTagId.next(tagId);
    }
}
