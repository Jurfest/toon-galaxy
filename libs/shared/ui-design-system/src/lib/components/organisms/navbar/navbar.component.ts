import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'design-system-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  active = 'home';
  toggleActive(tab: string): void {
    this.active = tab;
  }
}
