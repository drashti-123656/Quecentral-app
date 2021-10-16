import {scaleFont, scaleSize} from './mixins';
import {Dimensions} from 'react-native';
const wp = Dimensions.get('window').width;

// FONT FAMILY
export const POPPINS_MEDIUM = 'Poppins-Medium';
export const POPPINS_REGULAR = 'Poppins-Regular';
export const POPPINGS_LIGHT = 'Poppins-Light';
// FONT WEIGHT
export const FONT_WEIGHT_REGULAR = '400';
export const FONT_WEIGHT_BOLD = '600';
export const FONT_WEIGHT_LIGHT_BOLD = '500';
export const PAD_NORMAL = 12;
export const PAD_MEDIUM = 6;
export const PAD_SMALL = 3;

// FONT SIZE
export const FONT_SIZE_28 = scaleFont(28);
export const FONT_SIZE_24 = scaleFont(24);
export const FONT_SIZE_16 = scaleFont(wp <= 320 ? 14 : 16);
export const FONT_SIZE_18 = scaleFont(wp <= 320 ? 16 : 18);
export const FONT_SIZE_14 = scaleFont(wp <= 320 ? 12 : 14);
export const FONT_SIZE_12 = scaleFont(wp <= 320 ? 8 : 12);
export const FONT_SIZE_8 = scaleFont(wp <= 320 ? 4 : 8);
export const FONT_SIZE_20 = scaleSize(wp <= 320 ? 19 : 20);

// LINE HEIGHT
export const LINE_HEIGHT_24 = scaleFont(24);
export const LINE_HEIGHT_20 = scaleFont(20);
export const LINE_HEIGHT_16 = scaleFont(16);

export const typography = {
  $POPPINS_BOLD: 'Poppins-Bold',
  $POPPINS_MEDIUM: 'Poppins-Medium',
  $POPPINS_REGULAR: 'Poppins-Regular',
  $POPPINGS_LIGHT: 'Poppins-Light',
  $FONT_WEIGHT_REGULAR: '400',
  $FONT_WEIGHT_BOLD: '600',
  $FONT_WEIGHT_LIGHT_BOLD: '500',
  $PAD_NORMAL: 12,
  $PAD_MEDIUM: 6,
  $PAD_SMALL: 3,
  $FONT_SIZE_28: scaleFont(28),
  $FONT_SIZE_24: scaleFont(24),
  $FONT_SIZE_16: scaleFont(wp <= 320 ? 14 : 16),
  $FONT_SIZE_18: scaleFont(wp <= 320 ? 16 : 18),
  $FONT_SIZE_14: scaleFont(wp <= 320 ? 12 : 14),
  $FONT_SIZE_12: scaleFont(wp <= 320 ? 8 : 12),
  $FONT_SIZE_8: scaleFont(wp <= 320 ? 4 : 8),
  $FONT_SIZE_20: scaleSize(wp <= 320 ? 19 : 20),
  $LINE_HEIGHT_24: scaleFont(24),
  $LINE_HEIGHT_20: scaleFont(20),
  $LINE_HEIGHT_16: scaleFont(16),
};
