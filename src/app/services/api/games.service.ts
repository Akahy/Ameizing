import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'

@Injectable()
export class GamesService {
    private gamesUrl: string = "https://owi.b00.biz";
    //92e4c6ee-b76f-410d-b657-fd640a1aa5ae

    constructor (private http: Http) {}

    getFullInfoGames(player_id: string) {
        let url = this.gamesUrl + "/players/" + player_id +"/games";
        return this.http.get(url)
            .map(response => response.json() || {})
            .catch(this.handleError);
    }

    postGame(gameId: number, playerId: string, rating: number, mapId: string ) {
        let game = {
            "game_id": gameId,
            "player_id": playerId,
            "rating": rating,
            "map_id": mapId
        }
        let headers = new Headers({
            "Content-Type": "application/json",
            "Prefer": "return=representation",
            "Accept": "application/json"
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(
            this.gamesUrl+"/games",
            JSON.stringify(game),
            options)
            .map(response => response.json())
            .catch(error => this.handleError(error));
    }

    handleError(error : Response | any) {
        return error.message ? error.message : error.toString();
    }
}
