import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#e0fbfc', // light off-white(yellow tint)
    textSecondary: '#ee6c4d', // medium yellow
    background: '#3d5a80', // dark blue
    primary: '#293241', // deep red
    secondary: '#98c1d9' // deep orange
  },
  fontSizes: {
    body: 16,
    subheading: 18,
    heading: 22
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System'
    })
  },
  fontWeights: {
    normal: '400',
    bold: '700'
  }
};

export default theme;
