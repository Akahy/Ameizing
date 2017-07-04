import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'

@Injectable()
export class GamesService {
  private gamesUrl: string = "https://owpi.b00.biz/games";
  //92e4c6ee-b76f-410d-b657-fd640a1aa5ae

  constructor (private http: Http) {}

  getFullInfoGames(player_id: string) {
    let url = this.gamesUrl + "?players_id=eq." + player_id +
      "&select=*,maps%7Bid,name%7D,games_has_heroes%7Bheroes_id,%20games_id,%20heroes{id,name}}"+
      "order=game_id.desc";
    return this.http.get(url)
                    .map(response => response.json() || {})
                    .catch(this.handleError);
  }

  handleError(error : Response | any) {
    return error.message ? error.message : error.toString();
  }
}
