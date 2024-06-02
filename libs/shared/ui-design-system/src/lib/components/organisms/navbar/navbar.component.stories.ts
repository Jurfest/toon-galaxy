import type { Meta, StoryObj } from '@storybook/angular';
import { NavbarComponent } from './navbar.component';

const meta: Meta<NavbarComponent> = {
  component: NavbarComponent,
  title: 'Design System/Organisms/Navbar',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<NavbarComponent>;

export const Primary: Story = {
  args: {},
};
