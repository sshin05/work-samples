const breakpoints = ['767px', '1295px'];

const space = [0, 5, 10, 15, 25, 40, 80];
space.base = space[1];
space.xs = space[2];
space.s = space[3];
space.m = space[4];
space.l = space[5];
space.xl = space[6];

const colors = {
  background: '#ffffff',
  text: '#000000',
  black: '#000000',
  black95: 'rgba(0, 0, 0, 0.95)',
  black60: 'rgba(0, 0, 0, 0.60)',
  black40: 'rgba(0, 0, 0, 0.41)',
  black30: 'rgba(0, 0, 0, 0.3)',
  black20: 'rgba(0, 0, 0, 0.2)',
  black10: 'rgba(0, 0, 0, 0.1)',
  white: '#ffffff',
  white30: 'rgba(255, 255, 255, 0.3)',
  white20: 'rgba(255, 255, 255, 0.2)',
  white10: 'rgba(255, 255, 255, 0.1)',
  transparent: 'rgba(255, 255, 255, 0)',
  darkGray: '#2e2e2e',
  slateGray: '#474a4d',
  mercury: '#e8e8e8',
  neonViolet: '#661fff',
  lightViolet: '#824afb',
  pastelViolet: '#d2d5f2',
  neonGreen: '#00f8c0',
  navyBlue: '#0a0330',
  midnightBlue: '#070f58',
  _navyBlue: '#00078c',
  ultramarineBlue: '#222aa9',
  neonBlue: '#3e45fb',
  cyanBlue: '#42d4ff',
  candyAppleRed: '#e13131',
  peachRed: '#ff7676',
  pastelRed: '#fff3f3',
  _torchRed: '#ff1f1f',
  deepCove: '#11073d'
};

const fonts = {
  heading: '"Poppins", sans-serif',
  body: '"IBM Plex Sans", sans-serif',
  input: 'IBM Plex Mono',
  button: '"IBM Plex Sans", sans-serif'
};

const fontSizes = [12, 13, 14, 16, 20, 24, 30, 36, 56];
fontSizes.icon = {
  xs: 16,
  s: 18,
  m: 24,
  l: 36,
  xl: 48
};

const fontWeights = {
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 'bold'
};

const lineHeights = {};

const letterSpacing = {};

const text = {
  heading: {
    h1: {
      fontSize: [7, 8],
      fontWeight: 'bold',
      lineHeight: ['40px', '58px'],
      letterSpacing: ['-0.6', '-1px']
    },
    h2: {
      fontSize: [6, 7],
      fontWeight: 'regular',
      lineHeight: ['40px', '48px'],
      letterSpacing: ['-0.5px', '-1.5px']
    },
    h3: {
      fontSize: 5,
      fontWeight: 'regular',
      lineHeight: '32px',
      letterSpacing: '-1px'
    },
    h4: {
      fontSize: 4,
      fontWeight: 'medium',
      lineHeight: '28px',
      letterSpacing: '-0.75px'
    },
    h5: {
      fontSize: 2,
      fontWeight: 'semiBold',
      lineHeight: '24px',
      letterSpacing: '-0.5px'
    },
    h6: {
      fontSize: 0,
      fontWeight: 'regular',
      lineHeight: '20px',
      letterSpacing: '-0.5px'
    }
  },
  paragraph: {
    s: {
      fontFamily: 'body',
      fontSize: 1,
      fontWeight: 'regular',
      lineHeight: '26px',
      letterSpacing: 0
    },
    m: {
      fontFamily: 'body',
      fontSize: 3,
      fontWeight: 'regular',
      lineHeight: '28px',
      letterSpacing: 0
    },
    l: {
      fontFamily: 'body',
      fontSize: 4,
      fontWeight: 'medium',
      lineHeight: '50px',
      letterSpacing: 0
    }
  }
};

const cards = {
  primary: {
    cursor: 'pointer',
    padding: ['24px 20px', '24px 30px'],
    bg: 'midnightBlue'
  }
};

const buttons = {
  lightPrimary: {
    color: 'white',
    bg: 'black',
    fontFamily: 'button',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderRadius: '20px',
    padding: '12px 38px',
    cursor: 'pointer',
    '&:hover, &:focus, &:active': {
      outline: 'none'
    },
    '&:hover': {
      bg: 'neonViolet'
    },
    '&:active': {
      bg: 'neonGreen',
      color: 'black'
    },
    '&:disabled': {
      bg: 'black',
      opacity: '0.2'
    }
  },
  lightSecondary: {
    color: 'black',
    bg: 'white',
    fontFamily: 'button',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    border: 'solid 1px black',
    borderRadius: '20px',
    padding: '12px 38px',
    cursor: 'pointer',
    '&:hover, &:focus, &:active': {
      // Outline: 'none'
    },
    '&:hover': {
      borderColor: 'neonViolet'
    },
    '&:active': {
      borderColor: 'neonViolet',
      color: 'neonViolet',
      bg: 'neonGreen'
    },
    '&:disabled': {
      borderColor: 'neonViolet',
      color: 'neonViolet',
      opacity: '0.2'
    }
  },
  darkPrimary: {
    color: 'black',
    bg: 'white',
    fontFamily: 'button',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderRadius: '20px',
    padding: '12px 38px',
    cursor: 'pointer',
    '&:hover, &:focus, &:active': {
      outline: 'none'
    },
    '&:hover': {
      bg: 'neonViolet',
      color: 'white'
    },
    '&:active': {
      bg: 'neonGreen',
      color: 'black'
    },
    '&:disabled': {
      bg: 'neonViolet',
      color: 'white',
      opacity: '0.2'
    }
  },
  darkSecondary: {
    color: 'white',
    bg: 'transparent',
    fontFamily: 'button',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    border: 'solid 1px white',
    borderRadius: '20px',
    padding: '12px 38px',
    cursor: 'pointer',
    '&:hover, &:focus, &:active': {
      outline: 'none'
    },
    '&:hover': {
      borderColor: 'neonViolet',
      color: 'white'
    },
    '&:active': {
      bg: 'neonGreen',
      color: 'black'
    },
    '&:disabled': {
      color: 'neonViolet',
      opacity: '0.2'
    }
  },
  chip: {
    light: {
      color: 'black',
      bg: 'white20',
      fontFamily: 'button',
      fontWeight: 'bold',
      fontSize: '12px',
      textTransform: 'uppercase',
      borderRadius: '20px',
      padding: '7px 14.5px'
    },
    dark: {
      color: 'white',
      bg: 'white20',
      fontSize: '12px',
      fontFamily: 'button',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      borderRadius: '20px',
      padding: '7px 14.5px'
    }
  },
  pill: {
    light: {
      color: 'black',
      bg: 'black20',
      fontFamily: 'button',
      fontSize: '12px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      borderRadius: '20px',
      padding: '12px 38px',
      '&:hover, &:focus, &:active': {
        outline: 'none'
      },
      '&:hover': {
        bg: 'rgba(0, 0, 0, 0.30)'
      },
      '&:active': {
        bg: 'black',
        color: 'white'
      },
      '&:disabled': {
        bg: 'black20',
        color: 'black',
        opacity: '0.4'
      }
    },
    lightActive: {
      color: 'white',
      bg: 'black;',
      fontFamily: 'button',
      fontSize: '12px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      borderRadius: '20px',
      padding: '12px 38px',
      '&:hover, &:focus, &:active': {
        outline: 'none'
      },
      '&:active': {
        bg: 'black',
        color: 'white'
      },
      '&:disabled': {
        bg: 'rgba(0, 0, 0, 0.18)',
        color: 'black',
        opacity: '0.4'
      }
    },
    dark: {
      color: 'white',
      bg: 'white20',
      fontFamily: 'button',
      fontSize: '12px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      borderRadius: '20px',
      padding: '12px 38px',
      '&:hover, &:focus, &:active': {
        outline: 'none'
      },
      '&:hover': {
        bg: 'white30'
      },
      '&:active': {
        bg: 'white',
        color: 'black'
      },
      '&:disabled': {
        bg: 'white20',
        color: 'white',
        opacity: '0.4'
      }
    },
    darkActive: {
      color: 'black',
      bg: 'white',
      fontFamily: 'button',
      fontSize: '12px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      borderRadius: '20px',
      padding: '12px 38px',
      cursor: 'pointer',
      '&:hover, &:focus, &:active': {
        outline: 'none'
      },
      '&:active': {
        bg: 'white',
        color: 'black'
      },
      '&:disabled': {
        bg: 'white20',
        color: 'white',
        opacity: '0.4'
      }
    }
  }
};

const forms = {
  lightInput: {
    color: 'black',
    bg: 'black10',
    border: 'none'
  },
  darkInput: {
    color: 'white',
    bg: 'white30',
    border: 'none'
  },
  successInput: {
    color: '_navyBlue',
    bg: 'white',
    borderColor: 'neonViolet'
  },
  errorInput: {
    color: '_torchRed',
    bg: 'white',
    outlineColor: '_torchRed'
  }
};

const styles = {
  root: {
    fontFamily: 'body',
    width: '100%',
    height: '100%'
  },
  hr: {
    underline: {
      display: ['none', 'none', 'flex'],
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#3e45fb',
      borderRadius: '10px',
      margin: '0'
    }
  },
  a: {
    s: {
      fontFamily: 'body',
      fontSize: 1,
      lineHeight: '26px'
    },
    m: {
      fontFamily: 'heading',
      fontSize: 3,
      lineHeight: '28px'
    },
    l: {
      fontFamily: 'heading',
      fontSize: 4,
      lineHeight: '50px'
    },
    default: {
      cursor: 'pointer'
    }
  }
};

const images = {
  s: {
    width: '30px',
    minWidth: '30px',
    height: '30px',
    minheight: '30px'
  },
  m: {
    width: '50px',
    minWidth: '50px',
    height: '50px',
    minheight: '50px'
  },
  l: {
    width: '100px',
    minWidth: '100px',
    height: '100px',
    minheight: '100px'
  },
  fill: {
    width: '100%',
    height: '100%'
  }
};

const grids = {
  standard: {
    gridGap: '0',
    gridTemplateColumns: 'repeat(24, 1fr [col-start])'
  }
};

const theme = {
  breakpoints,
  space,
  colors,
  fonts,
  fontSizes,
  fontWeights,
  grids,
  images,
  lineHeights,
  letterSpacing,
  text,
  cards,
  buttons,
  forms,
  styles
};

/** The root styles for NEXT.js to fill content to height of page. */
export const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');  

  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html,
  body,
  #__next,
  #__next > div {
    height: 100%;
  }
`;
/** body {
    background-color: ${duuiColors.background.admin} !important;
  } */

export default theme;
