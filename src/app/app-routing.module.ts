import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { AuthGuard } from './Guards/auth.guard';
import { GamesComponent } from './Components/games/games.component';
import { GameDetailsComponent } from './Components/game-details/game-details.component';

const routes: Routes = [
  {path:"", redirectTo: "home", pathMatch:"full"},
  {path:"login", component: LoginComponent},
  {path:"register", component: RegisterComponent},
  {path:"home", component: HomeComponent, canActivate: [ AuthGuard ]},
  {path:"games/:key/:value", component: GamesComponent, canActivate: [ AuthGuard ]},
  {path: 'game-details/:id', component: GameDetailsComponent, canActivate: [ AuthGuard ]},
  {path:"**", redirectTo: "home", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
