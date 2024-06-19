import type { Meta, StoryObj } from '@storybook/angular';
import { EmptyResultComponent } from './empty-result.component';

const meta: Meta<EmptyResultComponent> = {
  component: EmptyResultComponent,
  title: 'Design System/Molecules/Empty Result',
};
export default meta;
type Story = StoryObj<EmptyResultComponent>;

export const Primary: Story = {
  args: {},
};
