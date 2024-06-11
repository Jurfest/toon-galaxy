import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { IconComponent } from '../../atoms/icon/icon.component';

@Component({
  selector: 'design-system-toggle-button',
  standalone: true,
  imports: [
    CommonModule,
    IconComponent,
    MatRippleModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './toggle-button.component.html',
  styleUrl: './toggle-button.component.scss',
  animations: [
    trigger('numberChange', [
      transition(':increment', [
        style({ transform: 'translateY(-20%)', opacity: 0 }),
        animate(
          '300ms ease-out',
          style({ transform: 'translateY(0)', opacity: 1 }),
        ),
      ]),
      transition(':decrement', [
        style({ transform: 'translateY(20%)', opacity: 0 }),
        animate(
          '300ms ease-out',
          style({ transform: 'translateY(0)', opacity: 1 }),
        ),
      ]),
    ]),
  ],
})
export class ToggleButtonComponent {
  totalFavoriteCharacters = input.required<number | null>();
  isHandset = input.required<boolean | null>();
  activeTab = input.required<string | null>();
  toggleActive = output<string>();

  onToggle(tabName: string): void {
    this.toggleActive.emit(tabName);
  }

  //
  //
  // // Old
  // // @Input() checked = false;
  // // // For two way binding the output property had to have same name of the input
  // // // plus 'change' and emit same type of data
  // // @Output() checkedChange = new EventEmitter<boolean>();

  // // New
  // checked = model(false);

  // activeTabName = model.required<string>();

  // handleClick(tabName: string): void {
  //   this.activeTabName.update(() => tabName);
  // }

  // // Other properties
  // indeterminate = false;
  // labelPosition: 'before' | 'after' = 'after';
  // disabled = false;

  // // Example of utilization of ModelSignal as an Writable Signal
  // handleClick(): void {
  //   this.checked.update((c) => !c);
  // }
}
