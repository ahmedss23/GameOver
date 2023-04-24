import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  baseURL:string = "https://free-to-play-games-database.p.rapidapi.com/api";

  constructor(private _HttpClient: HttpClient) {}

  getGames(url: string = ""): Observable <any> {
    return this._HttpClient.get(`${this.baseURL}/games${url}`);
  }

  getGameDetails(id: number): Observable <any> {
    return this._HttpClient.get(`${this.baseURL}/game?id=${id}`);
  }
}
