import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { LogoComponent } from '../../atoms/logo/logo.component';
import { ToggleButtonComponent } from '../../molecules/toggle-button/toggle-button.component';
import { NavbarComponent } from './navbar.component';

const meta: Meta<NavbarComponent> = {
  component: NavbarComponent,
  title: 'Design System/Organisms/Navbar',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, LogoComponent, ToggleButtonComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<NavbarComponent>;

export const Primary: Story = {
  args: {
    totalFavoriteCharacters: 3,
  },
};
