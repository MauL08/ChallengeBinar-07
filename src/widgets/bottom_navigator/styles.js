import { StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';
import AppConfig from '../../core/utils/app_config';

export const styles = StyleSheet.create({
  icon: focus => ({
    tintColor: focus ? AppConfig.buttonColor : AppConfig.blackColor,
    height: ms(28),
    width: ms(28),
  }),
});

export const tabBarStyle = {
  position: 'absolute',
  backgroundColor: 'white',
  elevation: 1,
  //   borderTopLeftRadius: ms(45),
  //   borderTopRightRadius: ms(45),
  borderColor: AppConfig.buttonColor,
  //   borderLeftWidth: ms(4),
  //   borderRightWidth: ms(4),
  height: ms(75),
  paddingHorizontal: ms(25),
};
