import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class NewGameService {
    //Observable string source
    private newGameTagId = new Subject<string>();
    private editGameTagId = new Subject<string>();

    //Observable string stream
    newGameTagId$ = this.newGameTagId.asObservable();
    editGameTagId$ = this.editGameTagId.asObservable();

    setNewGameTagId(tagId: string) {
        this.newGameTagId.next(tagId);
    }

    setEditGameTagId(tagId: string) {
        this.editGameTagId.next(tagId);
    }
}
