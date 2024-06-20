import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

import { IconComponent } from '../../atoms/icon/icon.component';

@Component({
  selector: 'design-system-icon-highlight',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './icon-highlight.component.html',
  styleUrl: './icon-highlight.component.scss',
  animations: [
    trigger('toggleHeartBackground', [
      state(
        'false',
        style({
          backgroundColor: 'rgba(255, 255, 255, 0.01)',
        }),
      ),
      state(
        'true',
        style({
          backgroundColor: '#ffffff',
        }),
      ),
      transition('false <=> true', [animate('0.5s ease-in-out')]),
    ]),
  ],
})
export class IconHighlightComponent {
  isSelected = input.required<boolean>();
  toggleIconSeleted = output<void>();

  onToggleFavCard(): void {
    this.toggleIconSeleted.emit();
  }
}
