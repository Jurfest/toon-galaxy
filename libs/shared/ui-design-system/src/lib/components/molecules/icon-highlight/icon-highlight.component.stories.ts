import type { Meta, StoryObj } from '@storybook/angular';
import { IconHighlightComponent } from './icon-highlight.component';

const meta: Meta<IconHighlightComponent> = {
  component: IconHighlightComponent,
  title: 'Design System/Molecules/Icon Highlight',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<IconHighlightComponent>;

export const Primary: Story = {
  args: {},
};
