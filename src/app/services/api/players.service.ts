import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class PlayersService {
    private playersUrl: string = "https://owpi.b00.biz/players";

    constructor (private http: Http) {}

    getPlayers() {
        return this.http.get(this.playersUrl)
                        .map(response => response.json() || {})
                        .catch(this.handleError);
    }

    private handleError(error: Response | any) {
        return error.message ? error.message : error.toString();
    }
}
