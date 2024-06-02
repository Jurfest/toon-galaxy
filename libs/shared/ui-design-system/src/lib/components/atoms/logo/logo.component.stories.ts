import type { Meta, StoryObj } from '@storybook/angular';
import { LogoComponent } from './logo.component';

const meta: Meta<LogoComponent> = {
  component: LogoComponent,
  title: 'Design System/Atoms/Logo',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<LogoComponent>;

export const Primary: Story = {
  args: {},
};
