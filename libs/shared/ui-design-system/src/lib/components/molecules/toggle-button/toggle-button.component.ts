import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'design-system-toggle-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toggle-button.component.html',
  styleUrl: './toggle-button.component.scss',
})
export class ToggleButtonComponent {
  active = 'home';
  toggleActive(tab: string): void {
    this.active = tab;
  }
}
