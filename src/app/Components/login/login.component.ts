import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  gamingImage:string = "./assets/images/gaming.ebaf2ffc84f4451d.jpg";
  gameOverLogo:string = "./assets/images/logo.png";
  isLoading:boolean = false;
  APIError?:string;

  loginForm:FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  })

  constructor(private _AuthService: AuthService, private _Router:Router) {}

  handleLogin(){
    this.isLoading = true;
    if(this.loginForm.valid){
      this._AuthService.login(this.loginForm.value).subscribe({
        next:res => {
          if(res.message == "success"){
            localStorage.setItem('userToken', res.token);
            this._AuthService.decodeUserData();
            this._Router.navigate(['/home']);
          } else {
            this.APIError = res.message;
          }
        },
        error: err =>{
          this.APIError = err.error.message;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }
}
