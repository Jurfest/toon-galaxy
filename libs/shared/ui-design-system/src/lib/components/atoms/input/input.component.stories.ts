import {
  applicationConfig,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { InputComponent, InputType } from './input.component';

import { expect, within } from '@storybook/test';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { importProvidersFrom } from '@angular/core';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';

const meta: Meta<InputComponent> = {
  component: InputComponent,
  title: 'Design System/Atoms/Input',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [MatFormFieldModule, MatInputModule],
    }),
    // Apply application config to all stories
    applicationConfig({
      // List of providers and environment providers that should be available to the root component and all its children.
      providers: [
        // Import application-wide providers from a module
        importProvidersFrom(BrowserAnimationsModule),
        // Or use provide-style functions if available instead, e.g.
        provideAnimations(),
      ],
    }),
  ],
};
export default meta;

export const Default: StoryObj<Omit<InputComponent, 'input'>> = {
  args: {
    inputType: InputType.text,
    placeholder: 'This is a placeholder',
    value: '',
    id: 'uuid',
  },
  argTypes: {
    placeholder: { control: 'text' },
    value: { control: 'text' },
  },
};

type Story = StoryObj<InputComponent>;

export const Primary: Story = {
  args: {},
};

// export const Heading: Story = {
//   args: {},
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     expect(canvas.getByText(/heading works!/gi)).toBeTruthy();
//   },
// };
