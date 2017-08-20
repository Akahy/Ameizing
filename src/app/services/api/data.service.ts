import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
    private apiUrl: string = "https://owi.b00.biz";

    constructor (private http: Http) {}

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
            .map(response => response.json() || {})
            .catch(error => Observable.throw(error));
    }
}
