import { Component } from '@angular/core';
import { MenuItem } from '../../interfaces/menu-item.interface';

@Component({
  selector: 'shared-side-menu',
  standalone: false,
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  public reactiveMenu : MenuItem[];
  public authMenu : MenuItem[];
  constructor(){
    this.reactiveMenu = [
      {title: 'Basics', route: '/reactive/basic'},
      {title: 'Dinamics', route: '/reactive/dinamic'},
      {title: 'Switches', route: '/reactive/switches'},
    ];
    this.authMenu = [
      {title: 'Register', route: '/auth'},
    ];
  }

}
