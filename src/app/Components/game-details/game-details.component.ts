import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { GameDetail } from 'src/app/Interfaces/game-detail';
import { GameService } from 'src/app/Services/game.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit{
  game?:GameDetail;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 100,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: false,
    autoplay: true
  }


  constructor (private _GameService: GameService, private _ActivatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe(params => {
      let id = params['id'];
      this._GameService.getGameDetails(id).subscribe( res => {
        this.game = res;
      })
    })

  }
}
