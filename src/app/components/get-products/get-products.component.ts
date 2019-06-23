import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-get-products',
  templateUrl: './get-products.component.html',
  styleUrls: ['./get-products.component.css']
})
export class GetProductsComponent implements OnInit {

  constructor(
    private titleService:Title
    ) {
      titleService.setTitle("TechStore");
    }

  ngOnInit() {
  }

}
