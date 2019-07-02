import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseHistoryComponent } from '../../components/purchase-history/purchase-history.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [PurchaseHistoryComponent],
  imports: [
    CommonModule,
    NgxPaginationModule
  ],
  exports: [PurchaseHistoryComponent]
})
export class PurchaseHistoryModule { }
