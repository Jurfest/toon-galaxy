import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { LogoComponent } from '../../atoms/logo/logo.component';

@Component({
  selector: 'design-system-navbar',
  standalone: true,
  imports: [CommonModule, LogoComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  active = 'home';
  toggleActive(tab: string): void {
    this.active = tab;
  }
}

export default NavbarComponent;
