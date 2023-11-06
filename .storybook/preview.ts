import type { Preview } from '@storybook/react'
import { withThemeProvider } from 'storybook-addon-theme-provider'
import { Provider } from '../src/config/Provider'
import { themes } from '../src/styles/Theme'

const preview: Preview = {
  decorators: [withThemeProvider(Provider)],
  globals: {
    selectedTheme: 'light',
    themes: [
      { name: 'light', color: '#E5E5E5', themeObject: themes.light },
      { name: 'dark', color: '#0e050e', themeObject: themes.dark },
    ],
  },
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
