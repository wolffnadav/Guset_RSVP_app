import {Component} from '@angular/core';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent {
//todo change googleMpas lat, lng to your own location
  lat: number = 32.333081;
  lng: number = 34.898812;
  zoom: number = 14;

}
