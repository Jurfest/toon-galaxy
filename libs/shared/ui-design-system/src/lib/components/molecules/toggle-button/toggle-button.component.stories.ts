import type { Meta, StoryObj } from '@storybook/angular';
import { ToggleButtonComponent } from './toggle-button.component';
import { TabName } from '../../../models/tab-name';

const meta: Meta<ToggleButtonComponent> = {
  component: ToggleButtonComponent,
  title: 'Design System/Molecules/Toggle Button',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<ToggleButtonComponent>;

export const Primary: Story = {
  args: {
    totalFavoriteCharacters: 3,
    isHandset: false,
    activeTab: TabName.Home,
  },
};
