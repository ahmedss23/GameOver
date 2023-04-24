import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/Interfaces/game';
import { GameService } from 'src/app/Services/game.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  pagination:number = 24;
  page: number = 1;
  games?: Game[];
  key?: string;
  value?: string;

  constructor(private _GameService: GameService, private _ActivatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    let url:string;
    this._ActivatedRoute.params.subscribe(res => {
      this.key = res['key'];
      this.value = res['value'];

      if(this.key == 'all') {
        url = "";
      } else {
        url = `?${this.key}=${this.value}`;
      }

      this._GameService.getGames(url).subscribe(res => {
        this.games = res;
      })
    })
  }

  showMore() {
    this.page++;
  }

}
