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
    <div class="!max-w-[200px] !w-[100px]">
      <design-system-toggle-button
        [totalFavoriteCharacters]="totalFavoriteCharacters"
        [isHandset]="isHandset"
        [activeTab]="activeTab"
        (toggleActive)="onToggle($event)"
        class="w-[100px]"
      ></design-system-toggle-button>
    </div>
  `,
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
    // Apply application config to all stories
    applicationConfig({
      // List of providers and environment providers that should be available to the root component and all its children.
      providers: [
        // Import application-wide providers from a module
        // importProvidersFrom(BrowserAnimationsModule),
        // Or use provide-style functions if available instead, e.g.
        provideAnimations(),
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<ToggleButtonHarnessComponent>;

export const Primary: Story = {
  args: {
    totalFavoriteCharacters: 3,
    isHandset: false,
    activeTab: TabName.Home,
  },
};

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

export const ActiveTabFavorites: Story = {
  args: {
    totalFavoriteCharacters: 10,
    isHandset: false,
    activeTab: TabName.Favorites,
  },
};
