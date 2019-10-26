import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';


import {AppComponent} from './app.component';
import { HomeComponent } from './home/home.component';
import { EndComponent } from './end/end.component';
import { DataComponent } from './data/data.component';
import { AgmCoreModule } from '@agm/core';
import { EndNotComponent } from './end-not/end-not.component';

const routes: Routes = [];

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: '1example' // todo get Google API key
    })
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    EndComponent,
    DataComponent,
    EndNotComponent
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [
    AppComponent,
  ]
})


export class AppModule {

}

