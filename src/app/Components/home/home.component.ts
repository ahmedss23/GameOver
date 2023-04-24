import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/Interfaces/game';
import { GameService } from 'src/app/Services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  games?: Game[];

  constructor(private _GameService: GameService) {}

  ngOnInit(): void {
    this._GameService.getGames('?sort-by=popularity').subscribe(res => {
      this.games = res.slice(0,3);
    })
  }
}
