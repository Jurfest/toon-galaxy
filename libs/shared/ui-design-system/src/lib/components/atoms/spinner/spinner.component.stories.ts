import type { Meta, StoryObj } from '@storybook/angular';
import { SpinnerComponent } from './spinner.component';

const meta: Meta<SpinnerComponent> = {
  component: SpinnerComponent,
  title: 'Design System/Molecules/Spinner',
};
export default meta;
type Story = StoryObj<SpinnerComponent>;

export const Primary: Story = {
  args: {},
};
