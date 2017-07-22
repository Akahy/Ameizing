import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'

@Injectable()
export class OverwatchService {
  private url: string = "https://owapi.net/api/v3/u/";

  constructor (private http: Http) {}

  getHeroesInformations(battletag: string) {
    let url = this.url + this.formatBattletag(battletag) + "/heroes";
    return this.http.get(url)
                    .map(response => response.json() || {})
                    .catch(this.handleError);
  }

  handleError(error : Response | any) {
    return error.message ? error.message : error.toString();
  }

  private formatBattletag(battletag: string) {

  }
}
