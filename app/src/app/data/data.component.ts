import {Component} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent {

  constructor(private http: HttpClient) {

  }
}
