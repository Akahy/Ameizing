import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class PlayersService {
    private playersUrl: string = "https://owi.b00.biz/players";

    constructor (private http: Http) {}

    getPlayers() {
        return this.http.get(this.playersUrl)
                        .map(response => response.json() || {})
                        .catch(error => Observable.throw(error));
    }
}
