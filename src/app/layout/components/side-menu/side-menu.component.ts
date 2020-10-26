import { Component, EventEmitter, Output } from '@angular/core';
import { mainNavItems, secondaryNavItems } from '../../navigation';

@Component({
  selector: 'num-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})

export class SideMenuComponent {
  mainNavItems = mainNavItems;
  secondaryNavItems = secondaryNavItems;

  @Output() toggleSideMenu = new EventEmitter();

  constructor() { }

  menuItemClicked($event: Event): void {
    const target = $event.currentTarget as HTMLElement;
    target.blur();
    this.toggleSideMenu.emit();
  }
}
