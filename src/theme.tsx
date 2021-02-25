import { future } from '@theme-ui/presets';
import { merge, Theme } from 'theme-ui';

export const pxToRem = (px: number) => `${px / 16}rem`;

export const TRANSITIONS = {
  standard: '0.3s ease-in-out',
};

// //////////////////// 0   1   2   3   4   5   6   7   8  9   10
const baseFontSizes = [10, 12, 14, 16, 18, 20, 22, 24, 32, 40, 48, 64];
const baseSpace = [0, 4, 8, 16, 32, 64, 128, 256, 512];
const baseSizes = [0, 4, 8, 16, 32, 64, 128, 256, 512];

// @ts-ignore
const theme: Theme = merge(future, {
  useBorderBox: true,
  useBodyStyles: true,
  breakpoints: ['48em', '64em', '80em'],
  fontSizes: baseFontSizes.map((size) => pxToRem(size)),
  space: baseSpace.map((size) => pxToRem(size)),
  sizes: baseSizes.map((size) => pxToRem(size)),
  fonts: {
    body: 'Roboto, sans-serif',
    heading: 'Roboto, sans-serif',
  },
  buttons: {
    primary: {
      cursor: 'pointer',
    },
  },
  layout: {
    container: {
      px: 3,
      maxWidth: pxToRem(1360),
    },
  },
});

export default theme;
