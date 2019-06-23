import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { Observable } from 'rxjs';
import { MenuItem } from 'src/app/models/MenuItem';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuItems:Observable<MenuItem[]>;

  constructor(private menuService:MenuService) {}

  ngOnInit() {
    this.menuItems = this.menuService.getMenuItems();
  }

}
