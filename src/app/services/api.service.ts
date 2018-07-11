import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { environment } from './../../environments/environment';
import * as moment from 'moment';

@Injectable()
export class ApiService {

  constructor(private http: Http, private router: Router, private route: ActivatedRoute) { }

  // GET
  get(url: string, data = []): Promise<any> {
    const urlApi = environment.API_URL + '/' + url;
    const requestOptions = new RequestOptions();
    if (data.length > 0) {
      const params: URLSearchParams = new URLSearchParams();
      for (let i in data) {
        params.set(data[i].name, data[i].value);
      }
      requestOptions.search = params;
    }
    return this.http.get(urlApi, requestOptions).map((res: Response) => res.json()).toPromise();
  }

  // POST
  post(url, data): Promise<any> {
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    const urlApi = environment.API_URL + '/' + url;
    return this.http.post(urlApi, data).map((res: Response) => {
      return res.json();
    }).toPromise();
  }

  // PUT
  put(url, data): Promise<any> {
    const urlApi = environment.API_URL + '/' + url;
    return this.http.put(urlApi, data).map((res: Response) => {
      return res.json();
    }).toPromise();
  }

  // DELETE
  delete(url): Promise<any> {
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    const urlApi = environment.API_URL + '/' + url;
    return this.http.delete(urlApi, options).map((res: Response) => {
      return res.json();
    }).toPromise();
  }

  checkLogin(data) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('currentUser1: ', currentUser);
    console.log('currentUser: ', JSON.stringify(data));
    localStorage.setItem('currentUser', JSON.stringify(data));
    // window.location.href = '/#/lms/dashboard';
    return currentUser;
  }

  checkLogOut() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    localStorage.removeItem('currentUser');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profileData');
    window.location.reload();
    window.location.href = '/#/lms/dashboard';
  }

}
