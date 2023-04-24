import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  gameOverLogo:string = "./assets/images/logo.png";
  isLoggedIn:boolean = false;

  constructor(private _AuthService: AuthService){}

  ngOnInit(): void {
    this._AuthService.userData.subscribe({
      next: () => this.isLoggedIn = Boolean(this._AuthService.userData?.value)
    })
  }

  logout(){
    this._AuthService.logout();
  }
}
