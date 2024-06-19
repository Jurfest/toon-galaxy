import { NgOptimizedImage } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { LogoComponent } from './logo.component';

const meta: Meta<LogoComponent> = {
  component: LogoComponent,
  title: 'Design System/Atoms/Logo',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [NgOptimizedImage],
    }),
  ],
};
export default meta;
type Story = StoryObj<LogoComponent>;

export const Primary: Story = {
  args: {},
};
