import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateParseService {

  constructor() { }

  parse(input:number):string {
    const date = new Date(input);
    return date.toUTCString();
  }
}
