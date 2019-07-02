import { Component, OnInit, Input } from '@angular/core';
import { Alert } from 'src/app/models/Alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() alert:Alert;

  constructor() { }

  ngOnInit() {
  }

}
