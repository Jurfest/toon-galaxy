import { Preview } from '@storybook/angular';
import { themes } from '@storybook/theming';

export const parameters = {
  docs: themes.dark,
};

const preview: Preview = {
  parameters: {
    options: {
      // The `a` and `b` arguments in this function have a type of `import('@storybook/types').IndexEntry`. Remember that the function is executed in a JavaScript environment, so use JSDoc for IntelliSense to introspect it.
      storySort: (a, b) =>
        a.id === b.id
          ? 0
          : a.id.localeCompare(b.id, undefined, { numeric: true }),
    },
    // storySort: {
    //   order: ['Intro', 'Pages', ['Home', 'Login', 'Admin'], 'Components'],
    // },
  },
};

export default preview;
