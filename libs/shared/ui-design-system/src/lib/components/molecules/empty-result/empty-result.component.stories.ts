import { moduleMetadata } from '@storybook/angular';

import { ButtonComponent } from '../../atoms/button/button.component';
import { EmptyResultComponent } from './empty-result.component';

import type { Meta, StoryObj } from '@storybook/angular';
const meta: Meta<EmptyResultComponent> = {
  component: EmptyResultComponent,
  title: 'Design System/Molecules/Empty Result',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent],
    }),
  ],
};
export default meta;
type EmptyResultStory = StoryObj<EmptyResultComponent>;

export const EmptyCharacters: EmptyResultStory = {
  args: {},
};

export const EmptyFavorites: EmptyResultStory = {
  render: (args) => {
    return {
      props: {
        ...args,
        headingContent: 'Parece que você ainda não tem favoritos',
        paragraphContent:
          'Volte à página inicial e escolha os melhores para você.',
      },
      template: `
        <design-system-empty-result
          headingContent="Parece que você ainda não tem favoritos"
          paragraphContent="Volte à página inicial e escolha os melhores para você."
        >
          <design-system-button (buttonClickEvent)="navigateToHome()"
            >Voltar ao início</design-system-button
          >
        </design-system-empty-result>
      `,
    };
  },
};
