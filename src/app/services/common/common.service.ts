import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

@Injectable()
export class CommonService {

  constructor(public http: Http) { }

  checkDate(date: any) {
    if (!date || date === '' || date === 'Invalid date') {
      return '';
    } else {
      return date;
    }
  }

  decodeURI(uri) {
    console.log(uri);
    if (uri) {
      uri = decodeURIComponent(uri);
    } else {

    }
    return uri
  }

  convertDate(date: any) {
    let dateTime = moment(date, 'YYYY-MM-DD HH:mm');
    if (dateTime.isValid()) {
      let dateFormat = dateTime.format('DD/MM/YYYY HH:mm');
      dateFormat = this.checkDate(dateFormat);
      return dateFormat;
    } else {
      return '';
    }
  }

  convertDateEN(date: any) {
    let dateTime = moment(date, 'YYYY-MM-DD HH:mm');
    if (dateTime.isValid()) {
      let dateFormat = dateTime.format('dddd, DD MMMM YYYY, HH:mm');
      dateFormat = this.checkDate(dateFormat);
      return dateFormat;
    } else {
      return '';
    }
  }

}
