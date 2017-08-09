import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'

@Injectable()
export class DataService {
    private gamesUrl: string = "https://owi.b00.biz";

    constructor (private http: Http) {}

    getHeroes() {
        let url = this.gamesUrl + "/heroes";
        return this.get(url);
    }

    getMaps() {
        let url = this.gamesUrl + "/maps";
        return this.get(url);
    }


    getMapTypes() {
        let url = this.gamesUrl + "/game_modes";
        return this.get(url);
    }

    private get(url: string) {
        return this.http.get(url)
            .map(response => response.json() || {})
            .catch(this.handleError);
    }

    handleError(error : Response | any) {
        return error.message ? error.message : error.toString();
    }
}
