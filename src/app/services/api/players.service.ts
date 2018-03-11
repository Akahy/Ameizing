import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class PlayersService {
    private playersUrl: string = "https://owi.b00.biz/players";

    constructor (private http: HttpClient) {}

    getPlayers() {
        return this.http.get(this.playersUrl)
            .pipe(
                catchError((error) => {
                    console.error(error);
                    return new ErrorObservable("Whoooops!");
                })
            );
    }
}
