import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class OverwatchService {
    private url: string = "https://owapi.net/api/v3/u/";

    constructor(private http: HttpClient) {}

    getHeroesInformations(battletag: string) {
        let url = this.url + this.formatBattletag(battletag) + "/heroes";
        return this.http.get(url)
            .pipe(
                catchError((error) => {
                    console.error(error);
                    return new ErrorObservable("Whoooops!");
                })
            );
    }

    private formatBattletag(battletag: string) {
        return battletag.replace("#", "-");
    }
}
