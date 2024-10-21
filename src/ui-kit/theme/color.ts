const baseColors = {
    congoPink: '#f48678',
    congoPinkActive: '#d96f62',
    congoPinkInActive: '#e5c2c2',
    lightSeaGreen: '#2aa9b2',
    lightSeaGreenActive: '#01919a',
    mediumPurple: '#9873ea',
    mediumPurpleActive: '#754dce',
    white: '#ffffff',
    whiteActive: '#fff9f8',
    whiteSmoke: '#f7f7f7',
    softPeach: '#f9f4f5',
    lightGray: '#dedede',
    lightblack: '#808080',
    black: '#000000',
    gray: '#7b7b7b',
    yellow: '#FFFF00',
    lightPink: '#F8DAD8',
    darkYellow: '#F7DC6F',
  
    orchid: '#e274d9',
    blueBolt: '#00baff',
    blue: '#0368FA',
    pictonBlue: '#4ab0e6',
    blueViolet: '#7247ee',
    lightSilver: '#D9D9D9',
    slateGray: '#648193',
    zambezi: '#5d5d5d',
    mediumLightPurple: '#8783e3',
    royalPurple: '#7952ad',
    byzantine: '#b72eb2',
    mantis: '#5fd854',
    red: '#ef4949',
    crayola: '#ff5845',
    chineseOrange: '#ea703a',
    deepSaffron: '#f5992e',
    darkChestnut: '#956753',
    darkBronze: '#7c5600',
    satinSheenGold: '#d1a33b',
    Lavender: '#D1C1F5',
    pureOrange: '#FEA800',
  
    sonicSilver: '#757575',
    azureRadiance: '#1877f2',
  
    transparent: 'transparent',
  };
  
  export const themeColors = {
    primary: baseColors.congoPink,
    primaryActive: baseColors.congoPinkActive,
    primaryDisabled: baseColors.congoPinkInActive,
    secondary: baseColors.lightSeaGreen,
    secondaryActive: baseColors.lightSeaGreenActive,
    tertiary: baseColors.mediumPurple,
    tertiaryActive: baseColors.mediumPurpleActive,
  };
  
  export const colors = {
    ...baseColors,
    ...themeColors,
  };
  
  export type ColorTypes = keyof typeof colors;
  
  export const alpha = (hex: string, opacity: number): string => {
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      let c = hex.slice(1).split('');
      if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      const h = Number(`0x${c.join('')}`);
      return `rgba(${[(h >> 16) & 255, (h >> 8) & 255, h & 255].join(
        ',',
      )}, ${opacity})`;
    }
    return ``;
  };