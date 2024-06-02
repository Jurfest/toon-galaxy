import type { Meta, StoryObj } from '@storybook/angular';
import { HomeComponent } from './home.component';

const meta: Meta<HomeComponent> = {
  component: HomeComponent,
  title: 'Design System/Pages/Home',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<HomeComponent>;

export const Primary: Story = {
  args: {},
};
