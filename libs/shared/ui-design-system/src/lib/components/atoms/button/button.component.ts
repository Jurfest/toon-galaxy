import { Component, input } from '@angular/core';

@Component({
  selector: 'design-system-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  label = input.required<string>();
}
