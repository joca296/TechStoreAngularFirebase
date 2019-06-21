import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { UserProfileComponent } from 'src/app/components/user-profile/user-profile.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@NgModule({
  declarations: [
    MenuComponent,
    UserProfileComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
