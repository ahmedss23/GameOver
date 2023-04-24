import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  gamingImage:string = "./assets/images/gaming.ebaf2ffc84f4451d.jpg";
  gameOverLogo:string = "./assets/images/logo.png";
  isLoading:boolean = false;
  APIError?:string;

  registerForm:FormGroup = new FormGroup({
    first_name: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    last_name: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    age: new FormControl(null, [Validators.required, Validators.min(18)]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z0-9]{2,}/)]),
  })

  constructor(private _AuthService: AuthService, private _Router:Router){}

  handleRegister(){
    if(this.registerForm.valid){
      this.isLoading = true;
      this._AuthService.register(this.registerForm.value).subscribe({
        next:res => {
          if(res.message == "success"){
            this._Router.navigate(['/login']);
          } else {
            for(let err in res.errors){
              this.registerForm.get(err)?.setErrors({
                APIError : res.errors[err]?.message
              })
            }
            this.APIError = res.message;
          }
        },
        error: err =>{
          this.APIError = err.error.message;
        },
        complete: () => {
          this.isLoading = false
        }
      });
    }
  }
}
