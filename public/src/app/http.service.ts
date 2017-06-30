import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs';


@Injectable()
export class HttpService {

  constructor(private _http: Http) { }

  getLocationName(location){
    return this._http.get("https://maps.googleapis.com/maps/api/geocode/json?&address="+location).map(data => data.json()).toPromise()
  }

  registerUser(user_obj){
   return this._http.post("/add_user", user_obj).map(data => data.json()).toPromise()
  }

  userLogin(user_obj){
    return this._http.post("/log_in", user_obj).map(data =>data.json()).toPromise()
  }

  addLocationToDB(marker_obj){
    return this._http.post("/add_marker", marker_obj).map(data =>data.json()).toPromise()
  }

  loadUserMarkersFromDB(user_id){
    return this._http.post("/load_locations", {user_id: user_id}).map(data =>data.json()).toPromise()
  }

  loadUserMarkersFromDB_Remix(event_id){
    return this._http.post("/load_locations_remix", {user_id: event_id}).map(data =>data.json()).toPromise()
  }


  removeMarker(marker){
    return this._http.post("/remove_marker", marker).map(data =>data.json()).toPromise()
  }

  updateUsersLocations(marker){
    return this._http.post("/update_user_locations", marker).map(data =>data.json()).toPromise()
  }

  updateMarkerInfo(info_obj){
    //console.log("info_obj: ", info_obj);
    return this._http.post("/update_marker", info_obj).map(data =>data.json()).toPromise()
  }

  addDayCountMoneyCountToUser(day_money_obj){
    //console.log("am I getting the day money obj, ", day_money_obj)
    return this._http.post("/update_users_money_day", day_money_obj).map(data =>data.json()).toPromise()
  }

  loadUserTrips(){
    return this._http.get("/load_trips").map(data =>data.json()).toPromise()
  }

}
