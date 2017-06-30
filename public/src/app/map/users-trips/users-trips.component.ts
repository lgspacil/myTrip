import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CookieService } from "angular2-cookie/services/cookies.service";
import { HttpService } from "app/http.service";

@Component({
  selector: 'app-users-trips',
  templateUrl: './users-trips.component.html',
  styleUrls: ['./users-trips.component.css']
})
export class UsersTripsComponent implements OnInit {
  @Output() closeUsersPage = new EventEmitter();
  @Output() checkOutTrip = new EventEmitter();

  users_trips = [];

  constructor(private _httpService: HttpService, private _cookieService:CookieService) { }

  ngOnInit() {

    this.loadUserTrips();
  }

  loadUserTrips(){
    this._httpService.loadUserTrips()
      .then((data) =>{
        this.users_trips = data;
        console.log("I want to see all the users trips: ", data)
        }      
      )
      .catch((err) =>{
        console.log("unable to post location to the DB");    
      })
  }

  //button when clicked will reload the list of trips:
  reloadList(){
    this.loadUserTrips();
  }

  closeUsersInfoPage(){
    this.closeUsersPage.emit(false);
  }

  checkOutUsersTrip(user_id){
    this.checkOutTrip.emit(user_id);
    this.closeUsersInfoPage();
  }

}
