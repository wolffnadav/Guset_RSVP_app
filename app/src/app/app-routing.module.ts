import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { EndComponent } from './end/end.component';
import { DataComponent } from './data/data.component';
import { EndNotComponent } from './end-not/end-not.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'end', component: EndComponent },
  { path: 'data', component: DataComponent },
  { path: 'not', component: EndNotComponent },
  { path: '**', redirectTo: '' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
