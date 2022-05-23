import { StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';
import AppConfig from '../../core/utils/app_config';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: AppConfig.blackColor,
    padding: AppConfig.paddingL,
    borderRadius: ms(6),
  },
  text: {
    color: AppConfig.baseColor,
    fontWeight: 'bold',
  },
});
