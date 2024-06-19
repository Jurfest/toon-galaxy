import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import {
  applicationConfig,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular';

import { TabName } from '../../../models/tab-name';
import { ToggleButtonComponent } from './toggle-button.component';

/* Toggle Button Harness Component */
@Component({
  selector: 'design-system-toggle-button-harness',
  template: `
    <div class="toggle-button-container">
      <design-system-toggle-button
        [totalFavoriteCharacters]="totalFavoriteCharacters"
        [isHandset]="isHandset"
        [activeTab]="activeTab"
        (toggleActive)="onToggle($event)"
      ></design-system-toggle-button>
    </div>
  `,
  styles: [
    `
      .toggle-button-container {
        width: 248px;
      }
    `,
  ],
})
class ToggleButtonHarnessComponent {
  totalFavoriteCharacters = 0;
  isHandset = false;
  activeTab = TabName.Home;

  onToggle(tabName: TabName): void {
    this.activeTab = tabName;
  }
}

const meta: Meta<ToggleButtonHarnessComponent> = {
  component: ToggleButtonHarnessComponent,
  title: 'Design System/Molecules/Toggle Button',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatRippleModule,
        MatIconModule,
        MatMenuModule,
        ToggleButtonComponent,
      ],
    }),
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
};
export default meta;

type Story = StoryObj<ToggleButtonHarnessComponent>;

export const Default: Story = {
  args: {
    totalFavoriteCharacters: 3,
    isHandset: false,
    activeTab: TabName.Home,
  },
};

export const Handset: Story = {
  args: {
    totalFavoriteCharacters: 5,
    isHandset: true,
    activeTab: TabName.Home,
  },
};
