import { Component } from '@angular/core';
import { HttpService } from "app/http.service";
import { CookieService } from "angular2-cookie/services/cookies.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // toggling on off components
  login = true;
  register = false;
  show_map = false;

  user_obj = {
    email: '',
    password: '',
  }

  error = '';


  constructor(private _httpService: HttpService, private _cookieService:CookieService){}

   ngOnInit() {
  }

  userLogin(){
    this._httpService.userLogin(this.user_obj)
      .then((data) =>{
        if(data == null){
          console.log("need to register first");
          this.error = "you have to register if this is your first time here";
  
        }
        else{
          if(this.user_obj.password == data.password){
            console.log("success for logging in! ", data);
            this._cookieService.put('user_name', data.username);
            this._cookieService.put('user_id', data._id);

            //if we get a succesfull log in the login_comp should go away and reveal the map.
            this.login = false;
            this.show_map = true;
          }
          else{
            this.error = "wrong password";
          }
        }  
      })
      .catch((err) =>{
        console.log("there was an error when logging in");
        
      })
  }

  registerUser(){
    console.log("submitting the form");
    this._httpService.registerUser(this.user_obj)
      .then((data) =>{
        console.log("hopefully this isnt always false: ", data)
        if (data == false){
          this.error = "You have already registered with this email!"
        }else{
          console.log("success posted to the DB: ", data)

          //creating a cookie object of the user who logged in
          this._cookieService.put('user_name', data.username);
          this._cookieService.put('user_id', data._id);

          //when we successfully register then... we need the register page to go away and have the map appear
          this.register = false;
          this.show_map = true;
        }
       
      })
      .catch((err) =>{
        console.log("something went wrong");
        
      })

  }

  switchToRegister(){
    this.login = false;
    this.register = true;
  }

  switchToLogin(){
    this.login = true;
    this.register = false;
  }

  closeMapPage(event){
    if(event == false){
      this.show_map = false;
    }
    this.login = true;
  }


}




