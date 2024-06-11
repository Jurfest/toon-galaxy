import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { IconComponent } from '../../atoms/icon/icon.component';
import { TabName } from '../../../models/tab-name';

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
  activeTab = input.required<TabName | null>();
  toggleActive = output<TabName>();

  // To use the enum values in the template
  readonly TabName = TabName;

  onToggle(tabName: TabName): void {
    this.toggleActive.emit(tabName);
  }

  // activeTab = model.required<string>();

  // onToggle(tabName: string): void {
  //   this.activeTab.update(() => tabName);
  // }
}
