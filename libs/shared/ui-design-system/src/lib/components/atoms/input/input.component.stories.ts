import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideStore } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import {
  applicationConfig,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular';
import {
  isLoading,
  LoadingFacade,
  provideSharedUtilCommon,
} from '@toon-galaxy/shared/util-common';

import { InputComponent, InputType } from './input.component';

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
        provideSharedUtilCommon(),
        provideStore(),
        LoadingFacade,
        provideMockStore({
          initialState: { isLoading: true },
          selectors: [{ selector: isLoading, value: true }],
        }),
      ],
    }),
  ],
  // argTypes: {
  //   inputType: {
  //     control: 'select',
  //     options: Object.values(InputType),
  //   },
  //   placeholder: {
  //     control: 'text',
  //   },
  //   label: {
  //     control: 'text',
  //   },
  // },
};

export default meta;

type Story = StoryObj<InputComponent>;

export const Default: StoryObj<Omit<InputComponent, 'input'>> = {
  args: {
    inputType: InputType.text,
    placeholder: 'Enter text...',
    label: 'Default Label',
    value: 'Default Input',
    enableLoading: false,
  },
};

export const Password: Story = {
  args: {
    inputType: InputType.password,
    placeholder: 'Enter your password...',
    label: 'Password Input',
    enableLoading: false,
  },
  // parameters: {
  //   mockStore: {
  //     initialState: { isLoading: false },
  //     selectors: [{ selector: isLoading, value: true }],
  //   },
  // },
};

export const Search: Story = {
  args: {
    label: 'Pesquisar',
  },
};
