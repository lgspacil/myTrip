import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from "app/app.component";
import { MapComponent } from "app/map/map.component";


const routes: Routes = [
  // {
  //   path: '',
  //   children: []
  // },
  { path: '', component: AppComponent },
  { path: '**', redirectTo: ''}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
