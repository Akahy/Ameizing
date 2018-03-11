import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class DataService {
    private apiUrl: string = "https://owi.b00.biz";

    constructor (private http: HttpClient) {}

    getHeroes() {
        let url = this.apiUrl + "/heroes";
        return this.get(url);
    }

    getMaps() {
        let url = this.apiUrl + "/maps";
        return this.get(url);
    }


    getMapTypes() {
        let url = this.apiUrl + "/game_modes";
        return this.get(url);
    }

    getRanks() {
        let url = this.apiUrl + "/ranks";
        return this.get(url);
    }

    private get(url: string) {
        return this.http.get(url)
            .pipe(
                catchError((error) => {
                    console.error(error);
                    return new ErrorObservable("Whoooops!");
                })
            );
    }
}
