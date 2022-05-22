import { Component } from 'react';
import { ms } from 'react-native-size-matters';

export default class AppConfig extends Component {
  // Padding Data
  static padding3XS = ms(1);
  static padding2XS = ms(2);
  static paddingXS = ms(4);
  static paddingS = ms(6);
  static paddingM = ms(8);
  static paddingL = ms(12);
  static paddingXL = ms(18);
  static padding2XL = ms(24);
  static padding3XL = ms(28);
  static padding4XL = ms(32);
  static padding5XL = ms(36);
  static padding6XL = ms(64);
  static padding7XL = ms(72);
  static padding8XL = ms(92);

  static heading1Size = ms(20);
  static heading2Size = ms(16);
  static heading3Size = ms(14);
  static normalFontSize = ms(12);

  // Color Data
  static baseColor = 'white';
  static primaryColor = '#60d67a';
  static buttonColor = '#60d67a';
  static blackColor = 'black';
}
