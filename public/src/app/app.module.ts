import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { HttpService } from "app/http.service";
import { MapComponent } from './map/map.component';
import { CookieService } from "angular2-cookie/services/cookies.service";
import { ViewInfoComponent } from './map/view-info/view-info.component';
import { AddInfoComponent } from "app/map/add-info/add-info.component";
import { UsersTripsComponent } from "app/map/users-trips/users-trips.component";




@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    AddInfoComponent,
    ViewInfoComponent,
    UsersTripsComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD9QqT__lEB5kzYAlfK6HpQEtgOAVijZyk'
    })
  ],
  providers: [HttpService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
