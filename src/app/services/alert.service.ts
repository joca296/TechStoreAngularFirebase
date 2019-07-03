import { Injectable } from '@angular/core';
import { Alert } from '../models/Alert';
import { isNullOrUndefined } from 'util';
import { AlertType } from '../models/AlertType';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  obj:Alert;

  constructor() { }

  clearMessages() {
    if(!isNullOrUndefined(this.obj))
      this.obj.messages.splice(0, this.obj.messages.length);
  }

  addMessage(message:string) {
    if(isNullOrUndefined(this.obj))
      this.obj = new Alert();
    this.obj.messages.push(message);
  }

  setHeading(heading:string) {
    if(isNullOrUndefined(this.obj))
      this.obj = new Alert();
    this.obj.heading = heading;
  }

  setType(type:AlertType) {
    if(isNullOrUndefined(this.obj))
      this.obj = new Alert();
    this.obj.type = type;
  }
}
