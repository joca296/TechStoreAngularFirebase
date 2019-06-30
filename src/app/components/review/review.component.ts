import { Component, OnInit, Input } from '@angular/core';
import { ReviewExtended } from 'src/app/models/ReviewExtended';
import { DateParseService } from 'src/app/services/date-parse.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() review:ReviewExtended;

  constructor(
    public date: DateParseService
  ) { }

  ngOnInit() {
  }

}
