import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

// 全域預設字體
const fonts = {
  body: 'system-ui, sans-serif',
  heading: 'Georgia, serif',
};

export const theme = extendTheme({ colors, fonts });
