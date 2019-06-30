import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseHistoryComponent } from '../../components/purchase-history/purchase-history.component';

@NgModule({
  declarations: [PurchaseHistoryComponent],
  imports: [
    CommonModule
  ],
  exports: [PurchaseHistoryComponent]
})
export class PurchaseHistoryModule { }
