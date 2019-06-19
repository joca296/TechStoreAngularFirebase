import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { MenuItem } from 'src/app/models/MenuItem';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuItems:MenuItem[] = new Array();

  constructor(private menuService:MenuService) {}

  ngOnInit() {
    this.menuService.getMenuItems().subscribe(results => {
      results.forEach(result => {
        this.menuItems.push({
          name: result.data().name,
          url: result.data().url
        });
      });
    });
    console.log(this.menuItems);
  }

}
