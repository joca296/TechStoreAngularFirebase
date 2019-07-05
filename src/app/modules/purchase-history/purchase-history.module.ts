import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseHistoryComponent } from '../../components/purchase-history/purchase-history.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AlertModule } from '../alert/alert.module';

@NgModule({
  declarations: [PurchaseHistoryComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    AlertModule
  ],
  exports: [PurchaseHistoryComponent]
})
export class PurchaseHistoryModule { }
