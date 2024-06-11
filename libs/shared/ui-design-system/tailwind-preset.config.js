// NOTE: - Could be inside dir libs/shared/tailwind-preset
const { space } = require('./src/lib/tokens/space');
const { radii } = require('./src/lib/tokens/radii');
const { lineHeights } = require('./src/lib/tokens/line-heights');
const { fonts } = require('./src/lib/tokens/fonts');
const { fontWeights } = require('./src/lib/tokens/font-weights');
const { fontSizes } = require('./src/lib/tokens/font-sizes');
const { colors } = require('./src/lib/tokens/colors');

module.exports = {
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideOut: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100)' },
        },
      },
      animation: {
        slideIn: 'slideIn 0.4s ease-out',
        slideOut: 'slideOut 0.4s ease-out',
      },
      letterSpacing: {
        '-0.02em': '-0.02em',
      },
      spacing: {
        ...space,
      },
      borderRadius: {
        ...radii,
      },
      lineHeight: {
        shorter: lineHeights.shorter,
        short: lineHeights.short,
        base: lineHeights.base,
        tall: lineHeights.tall,
      },
      fontFamily: {
        default: fonts.default,
        creepster: fonts.creepster,
      },
      fontWeight: {
        regular: fontWeights.regular,
        medium: fontWeights.medium,
        bold: fontWeights.bold,
      },
      fontSize: {
        ...fontSizes,
      },
      colors: {
        // Core colors
        'color-core-background': colors.color_core_background,
        'color-core-foreground': colors.color_core_foreground,
        'color-core-content': colors.color_core_content,
        'color-core-content-low': colors.color_core_content_low,
        'color-core-border': colors.color_core_border,

        // Neutral colors
        'color-neutral-foreground': colors.color_neutral_foreground,
        'color-neutral-surface-lower': colors.color_neutral_surface_lower,
        'color-neutral-surface': colors.color_neutral_surface,
        'color-neutral-content': colors.color_neutral_content,
        'color-neutral-content-high': colors.color_neutral_content_high,
        'color-neutral-content-higher': colors.color_neutral_content_higher,
        'color-neutral-border': colors.color_neutral_border,

        //
        'green-300': colors.green_300,
        'blue-300': colors.blue_300,
        'gray-500': colors.gray_500,
        'gray-600': colors.gray_600,
        'black-100': colors.black_100,
        'black-700': colors.black_700,
      },
    },
  },
  plugins: [
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/aspect-ratio'),
  ],
};
