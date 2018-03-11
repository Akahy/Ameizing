import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class GamesService {
    private gamesUrl: string = "https://owi.b00.biz";
    //92e4c6ee-b76f-410d-b657-fd640a1aa5ae

    constructor (private http: HttpClient) {}

    getFullInfoGames(player_id: string) {
        let url = this.gamesUrl + "/players/" + player_id +"/games";
        return this.http.get(url)
            .pipe(
                catchError((error) => {
                    console.error(error);
                    return new ErrorObservable("Whoooops!");
                })
            );
    }

    getLastGame(playerId: string) {
        let url = this.gamesUrl + "/players/" + playerId +"/games?limit=1";
        return this.http.get(url)
            .pipe(
                catchError((error) => {
                    console.error(error);
                    return new ErrorObservable("Whoooops!");
                })
            );
    }

    postGame(gameId: number, playerId: string, rating: number, mapId: string ) {
        let game = {
            "game_id": gameId,
            "player_id": playerId,
            "rating": rating,
            "map_id": mapId
        }

        let url = this.gamesUrl+"/games";
        const options = {
            headers:  new HttpHeaders({
                "Content-Type": "application/json",
                "Prefer": "return=representation",
                "Accept": "application/json"
            })
        };
        return this.http.post(url, JSON.stringify(game), options)
            .pipe(
                catchError((error) => {
                    console.error(error);
                    return new ErrorObservable("Whoooops!");
                })
            );
    }

    handleError(error : Response | any) {
        return Observable.throw(error);
    }

    postGameHeroes(gameUuid: string, heroesId: string[]) {
        let info = [];
        for(let hero of heroesId) {
            info.push({
                "game_id": gameUuid,
                "hero_id": hero
            });
        }

        let url = this.gamesUrl+"/game_has_heros";
        const options = {
            headers:  new HttpHeaders({
                "Content-Type": "application/json",
                "Prefer": "return=representation",
                "Accept": "application/json"
            })
        };
        return this.http.post(url, JSON.stringify(info), options)
            .pipe(
                catchError((error) => {
                    console.error(error);
                    return new ErrorObservable("Whoooops!");
                })
            );
    }
}
