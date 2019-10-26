import {Component, AfterViewInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {of} from 'rxjs';
import swal from 'sweetalert2';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {environment} from "../../environments/environment";
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  // todo choose your own date, names and location
  date = 'ביום שישי  ה-20.09.2019';
  name = 'ישאל וישראלה';
  location = 'בגן הפקאן';

  // initial vars
  coming = false;
  not_coming = false;
  form: FormGroup;
  number_of_guests = [];
  id: string;
  send = false;


  /**
   * create the formBuilder to get number_of_guests
   * @param route
   * @param formBuilder
   * @param http
   */
  constructor(private _router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private http: HttpClient) {
    this.form = this.formBuilder.group({
      number_of_guests: ['-1']
    });

    of(this.get_number_of_guests()).subscribe(number_of_guests => {
      this.number_of_guests = number_of_guests;
    });
    if (localStorage.getItem("id") != null) {
      console.log(localStorage.getItem("id"));
      console.log(localStorage.getItem("name"));
    }

  }

  /**
   * after 1 second if id and name are not saved yet
   * get queryParamMap id and name and save it to localStorage
   *
   */
  ngAfterViewInit() {
    setTimeout(() => {
      console.log('works');
      if (this.route.snapshot.queryParamMap.get("id") != null) {

        localStorage.setItem("id", this.route.snapshot.queryParamMap.get("id"));
        localStorage.setItem("name", this.route.snapshot.queryParamMap.get("name"));

        console.log(localStorage.getItem("id"));
        console.log(localStorage.getItem("name"));
      }

    }, 1000)
  }

  /**
   * todo choose your own option for select button
   */
  get_number_of_guests() {
    return [
      {id: '1', name: '1'},
      {id: '2', name: '2'},
      {id: '3', name: '3'},
      {id: '4', name: '4'},
      {id: '5', name: '5'},
      {id: '6', name: '6'},
      {id: '7', name: '7'},
      {id: '8', name: '8'},
      {id: '9', name: '9'},
      {id: '10', name: '10'}
    ];
  }

  /**
   * when press we are coming, next options open and
   * number_of_guests set initially to 1
   */
  startComing() {
    this.not_coming = false;
    this.coming = true;
    this.send = true;
    this.form.controls.number_of_guests.patchValue('1');
  }

  /**
   * when press we are not coming, next options open and
   * number_of_guests set initially to 0
   */
  startNotComing() {
    this.coming = false;
    this.not_coming = true;
    this.send = true;
    this.form.controls.number_of_guests.patchValue('0');
    this.SubmitComing();
  }


  /**
   * if coming is true then when submit you get 'see-you-soon' massage
   * else you get 'see-you-other-time' massage
   * and then send httpPost to db
   */
  SubmitComing() {
    if (this.coming) {
      //coming alert
      swal.fire({
        title: '',
        type: "success",
        text: `נשמח לראותכם, כדאי לבוא עם נעליים נוחות,`,
        confirmButtonText: "נתראה בקרוב",
      });
    } else {
      //not coming alert
      swal.fire({
        title: '',
        type: "success",
        text: `מצטערים לשמוע שלא תוכלו להגיע, ניפגש בשמחות`,
        confirmButtonText: "סיום",
        width: '500'

      });
    }

    console.log(this.form.value.number_of_guests);
    console.log(localStorage.getItem("id"));
    console.log(localStorage.getItem("name"));

    this.http.post<any>(environment.apiUrl + '/api/wedding', {
        number_of_guests: this.form.value.number_of_guests,
        name: localStorage.getItem("name"),
        id: localStorage.getItem("id")
      },
      {headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe();
    if (this.coming) {
      this._router.navigate(['end']);
    } else {
      this._router.navigate(['not']);

    }
  }
}
