import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-picture-slider',
  templateUrl: './product-picture-slider.component.html',
  styleUrls: ['./product-picture-slider.component.css']
})
export class ProductPictureSliderComponent implements OnInit {
  @Input() imageUrls:string[];

  constructor() { }

  ngOnInit() {
  }

}
