import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ReviewsService } from 'src/app/services/reviews.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  @Input() inputProductId:string;
  comment:string = "";

  constructor(
    public auth: AuthService,
    private reviewsService: ReviewsService
  ) { }

  ngOnInit() {

  }

  onSubmit() {
    if(this.comment.trim().length != 0){
      this.auth.loggedInUser.subscribe(user => {
        this.reviewsService.createReview(user.uid, this.inputProductId, this.comment);
      });
    }
    else {
      alert("You cannot leave an empty comment.");
    }
  }

}
