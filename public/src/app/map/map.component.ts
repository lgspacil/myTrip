import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from "app/http.service";
import { CookieService } from "angular2-cookie/services/cookies.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Output() markerThatWasClicked = new EventEmitter();
  @Output() closeMapPage = new EventEmitter();


  //user info stored in the cookie:
  name = this._cookieService.get('user_name');
  user_id = this._cookieService.get('user_id');

  //Zoom level
  zoom: number = 9;

  //Start Postion
  latitude: number;
  longitude: number;

  //values
  markerName:string = '';
  markerLat:string = '';
  markerLng:string = '';

  //Markers
  markers = [
  ];

  //parameter to load info page 
  info_page = false;
  add_info_page = false;
  users_trips_page = false;

  //variable that will be available to the child
  add_info_to_marker = null;
  info_for_child_to_display = null;
  
  //Day Count Variable and Money Count Variable
  day_money_obj = {
    'day_count' : 0,
    'money_count' : 0,
    'user_id': null,
    'trip_name': []
  }

  //new id when we want to see someone else's trips:
  new_id = null;
  

  constructor(private _httpService: HttpService, private _cookieService:CookieService, private _route: ActivatedRoute) { }

  ngOnInit() {
  

    this.loadUserMarkersFromDB();
  }

  //this function will load all the locations when the user logged in, I am passing in the user_id cookie..
  loadUserMarkersFromDB(){
    //passing in the user_id from cookie
      this._httpService.loadUserMarkersFromDB(this.user_id)
        .then((data) =>{
          console.log("here are all the points that was loaded when we loaded the page: ", data._locations)

          //data is the objects of the user
          // so I need to make a loop and go through them all adding them to the markers array
          this.markers = [];
          this.day_money_obj = {
            'day_count' : 0,
            'money_count' : 0,
            'user_id': null,
            'trip_name': []
          }

          for(var i = 0; i < data._locations.length; i++){
            let newMarker = {'location_name': data._locations[i].location_name,
                             'latitude': data._locations[i].latitude,
                             'longitude': data._locations[i].longitude,
                             '_user': data._locations[i]._user,
                             'username': data._locations[i].username,
                             'content': data._locations[i].content,
                             'price': data._locations[i].price,
                             '_id': data._locations[i]._id,
                             'images': data._locations[i].images,
                             'img_url': data._locations[i].img_url,
                             'day_number': data._locations[i].day_number,
                             'trip_location': data._locations[i].trip_location
                          }
            this.markers.push(newMarker);
            //finding the largest day count Number...
            if (data._locations[i].day_number > this.day_money_obj.day_count){
              this.day_money_obj.day_count = data._locations[i].day_number;
            }

            this.day_money_obj.money_count += data._locations[i].price;

            //adding the trip name to the user information..
            this.day_money_obj.trip_name.push(data._locations[i].trip_location);
          }

          //add the users_id to the obj so we know what user to update the day and money count
          this.day_money_obj.user_id = this.user_id;

          //if no marker was placed start in the bay area else, start at the markers last placed position
          if (this.markers.length == 0){
            this.latitude = 37.7749295;
            this.longitude = -122.4194155;
          }else{
            this.latitude = this.markers[this.markers.length -1].latitude;
            this.longitude = this.markers[this.markers.length -1].longitude;
          }


          //add the updated informatino about the current days and money count to the DB:
          this._httpService.addDayCountMoneyCountToUser(this.day_money_obj)
            .then((data) =>{
              console.log("awesome this new feature worked")
            })
            .catch((err) =>{
              console.log("unable to update users money and day count")
            })
        })
        .catch((err) =>{
          console.log("there was an error when loading the locations on page load")
        })
    }


  
  clickedMarker(marker, index:number){
    console.log('Clicked Marker:' +marker.name+ ' at index '+ index);
  }

  // $event in this case was passed in and it is the object with coordinates and name
  mapClicked($event:any){
    if(this.new_id == this.user_id || this.new_id == null){

      console.log("a new marker was added when the screen was clicked: ", event);
      var newMarker = {
        location_name: '',
        latitude: $event.coords.lat,
        longitude: $event.coords.lng,
        username: this.name,
        _user: this.user_id,
        icon_url: '',
        content: '',
        price: 0,
        day_number: 0,
        trip_location: ''

      }

      //add this location to the DB
      this._httpService.addLocationToDB(newMarker)
        .then((data) =>{
          if (data != null){
            this.markers.push(data);
            console.log("pushed this location to the markers array: ", data)

            //moving the map to the location that was just added
            this.latitude = this.markers[this.markers.length -1].latitude;
            this.longitude = this.markers[this.markers.length -1].longitude;
          }      
        })
        .catch((err) =>{
          console.log("unable to post location to the DB");    
        })
      
    }
  }


//using the input tag to look up a marker point using the google api
  getLocationName(){
    if(this.new_id == this.user_id || this.new_id == null){

      this._httpService.getLocationName(this.markerName)
      .then((data) =>{
        console.log("this is the data that came back: ", data.results[0].geometry.location)

        this.markerLat = data.results[0].geometry.location.lat
        this.markerLng = data.results[0].geometry.location.lng

        var newMarker = {
          location_name: this.markerName,
          latitude: parseFloat(this.markerLat),
          longitude: parseFloat(this.markerLng),
          username: this.name,
          _user: this.user_id,
          icon_url: '',
          content: '',
          price: 0,
          day_number: 0,
          trip_location: ''
        }

        //add this location to the DB
        this._httpService.addLocationToDB(newMarker)
          .then((data) =>{
            if (data != null){
              this.markers.push(data);
              console.log("pushed this location to the markers array, ", data)

              //moving the map to the location that was just added
              this.latitude = this.markers[this.markers.length -1].latitude;
              this.longitude = this.markers[this.markers.length -1].longitude;
            }
            
          })
          .catch((err) =>{
            console.log("unable to post location to the DB");
            
          })

      })

      .catch((err) =>{
        console.log("ther was an error")
      })

    }
  }

//removing the marker
  removeMarker(marker){
    console.log("removing marker.... at the id of: ", marker._id)
    this._httpService.removeMarker(marker)
      .then((data) =>{
        //if successful removal then I need to update the users location
        this._httpService.updateUsersLocations(marker)
          .then((data) =>{
            console.log("I think this means that I was able to remove one of the locations after updating the locaions array, ", data)
            this.loadUserMarkersFromDB();
          // for(var i=0; i< this.markers.length; i++){
          //   if(marker.latitude == this.markers[i].latitude && marker.longitude == this.markers[i].longitude){
          //     this.markers.splice(i, 1)
          //   }
          // }
          })
          .catch((err) =>{
            console.log("Didnt work :( ");
          })

      })
      .catch((err) =>{
        console.log("unable to reload the locations");
        
      })
    
  }

  //the button that will open up the component on the bottom called APP INFO
  load_view_info(marker_obj){
    this.info_page = true;
    this.add_info_page = false;

    this.info_for_child_to_display = marker_obj;
  }

  load_add_info(marker_obj){
    this.add_info_page = true;
    this.info_page = false;

    this.add_info_to_marker = marker_obj;


    console.log("wanting to pass this information to the child: ", marker_obj);

    // this.markerThatWasClicked.emit(marker_obj);
  }


  reloadPage(event){
    this.loadUserMarkersFromDB();
    if (event == false){
      this.add_info_page = false;
    }
  }

  closeInfoPage(event){
    if (event == false){
      this.info_page = false;
    }
  }

  closeAddPage(event){
    if(event == false){
      this.add_info_page = false;
    }
  }

  showsUsersTrips(){
    this.users_trips_page = true;

  }

  closeUsersPage(event){
    if (event == false){
      this.users_trips_page = false;
    }
  }

  logout(){
    this.add_info_page = false;
    this.info_page = false;
    this.users_trips_page = false;
    this.closeMapPage.emit(false);
  }

  checkOutTrip(event){
    console.log("I want to see this users trip: this should be there id..", event)
    this.new_id = event;

    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////Attempting to load users points////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    this.loadUserMarkersFromDB_Remix();


  }

  loadUserMarkersFromDB_Remix(){
    //passing in the user_id from cookie
      this._httpService.loadUserMarkersFromDB_Remix(this.new_id)
        .then((data) =>{
          console.log("here are all the points that was loaded when we loaded the page: ", data._locations)

          //data is the objects of the user
          // so I need to make a loop and go through them all adding them to the markers array
          this.markers = [];
          this.day_money_obj = {
            'day_count' : 0,
            'money_count' : 0,
            'user_id': null,
            'trip_name': []
          }

          for(var i = 0; i < data._locations.length; i++){
            let newMarker = {'location_name': data._locations[i].location_name,
                             'latitude': data._locations[i].latitude,
                             'longitude': data._locations[i].longitude,
                             '_user': data._locations[i]._user,
                             'username': data._locations[i].username,
                             'content': data._locations[i].content,
                             'price': data._locations[i].price,
                             '_id': data._locations[i]._id,
                             'images': data._locations[i].images,
                             'img_url': data._locations[i].img_url,
                             'day_number': data._locations[i].day_number,
                             'trip_location': data._locations[i].trip_location
                          }
            this.markers.push(newMarker);
            //finding the largest day count Number...
            if (data._locations[i].day_number > this.day_money_obj.day_count){
              this.day_money_obj.day_count = data._locations[i].day_number;
            }

            this.day_money_obj.money_count += data._locations[i].price;

            //adding the trip name to the user information..
            this.day_money_obj.trip_name.push(data._locations[i].trip_location);
          }

          //add the users_id to the obj so we know what user to update the day and money count
          this.day_money_obj.user_id = this.new_id;
          
          //if no marker was placed start in the bay area else, start at the markers last placed position
          if (this.markers.length == 0){
            this.latitude = 37.7749295;
            this.longitude = -122.4194155;
          }else{
            this.latitude = this.markers[this.markers.length -1].latitude;
            this.longitude = this.markers[this.markers.length -1].longitude;
          }

          //add the updated informatino about the current days and money count to the DB:
          this._httpService.addDayCountMoneyCountToUser(this.day_money_obj)
            .then((data) =>{
              console.log("awesome this new feature worked")
            })
            .catch((err) =>{
              console.log("unable to update users money and day count")
            })
        })
        .catch((err) =>{
          console.log("there was an error when loading the locations on page load")
        })
    }

}
