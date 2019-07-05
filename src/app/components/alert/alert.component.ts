import { Component, OnInit, Input } from '@angular/core';
import { Alert } from 'src/app/models/Alert';
import { AlertType } from 'src/app/models/AlertType';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() alert:Alert;
  @Input() type:AlertType;
  @Input() heading:string;
  @Input() message:string;

  constructor() {
  }

  ngOnInit() {
    if (isNullOrUndefined(this.alert) && !isNullOrUndefined(this.type) && !isNullOrUndefined(this.message)) {
      this.alert = new Alert();
      this.alert.type = this.type;
      this.alert.heading = this.heading;
      this.alert.messages.push(this.message);
    }
  }

}
