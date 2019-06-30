import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Title } from '@angular/platform-browser';
import { PurchaseService } from 'src/app/services/purchase.service';
import { PurchaseHistory } from 'src/app/models/PurchaseHistory';
import { DateParseService } from 'src/app/services/date-parse.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {
  purchaseHistory:PurchaseHistory[] = new Array<PurchaseHistory>();

  constructor(
    private auth: AuthService,
    private titleService: Title,
    private purchaseService: PurchaseService,
    public date: DateParseService
  ) {
    this.titleService.setTitle("Tech Store - Purchase history");
  }

  ngOnInit() {
    this.auth.loggedInUser.subscribe(user => {
      this.purchaseService.getHistory(user.uid).subscribe(history => this.purchaseHistory = history);
    });
  }

}
