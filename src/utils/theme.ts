import { extendTheme } from '@chakra-ui/react';

const colors = {
  primary: 'teal',
  secondary: 'gray',
  bg: '#FBF9FB',
};

const fonts = {
  body: 'poppins',
  p: 'poppins',
  text: 'poppins',
  heading: 'poppins',
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: 500,
      fontSize: 14,
    },
  },
};

export default extendTheme({
  colors,
  fonts,
  components,
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});
