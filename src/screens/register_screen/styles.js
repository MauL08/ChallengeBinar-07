import { StyleSheet, Dimensions } from 'react-native';
import { ms } from 'react-native-size-matters';
import AppConfig from '../../core/utils/app_config';

const { width } = Dimensions.get('screen');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: AppConfig.baseColor,
  },
  main: {
    alignItems: 'center',
    padding: AppConfig.paddingXL,
  },
  title: {
    color: 'black',
    fontSize: ms(28),
    fontWeight: 'bold',
    marginBottom: AppConfig.padding5XL,
  },
  usernameInputBar: {
    width: width - AppConfig.padding2XL,
    borderWidth: ms(1),
    borderRadius: ms(8),
    padding: AppConfig.paddingL,
  },
  emailInputBar: {
    width: width - AppConfig.padding2XL,
    borderWidth: ms(1),
    borderRadius: ms(8),
    padding: AppConfig.paddingL,
    marginTop: AppConfig.paddingXL,
  },
  passwordInputBar: {
    width: width - AppConfig.padding2XL,
    borderWidth: ms(1),
    borderRadius: ms(8),
    padding: AppConfig.paddingL,
    marginTop: AppConfig.paddingXL,
  },
  imageInputBar: {
    width: width - AppConfig.padding2XL,
    borderWidth: ms(1),
    borderRadius: ms(8),
    padding: AppConfig.paddingL,
    marginTop: AppConfig.paddingXL,
  },
  numberInputBar: {
    width: width - AppConfig.padding2XL,
    borderWidth: ms(1),
    borderRadius: ms(8),
    padding: AppConfig.paddingL,
    marginVertical: AppConfig.paddingXL,
  },
  moveButton: {
    padding: AppConfig.paddingL,
    borderRadius: ms(6),
    backgroundColor: AppConfig.buttonColor,
    marginTop: AppConfig.paddingL,
  },
  moveButtonText: {
    fontWeight: 'bold',
    color: AppConfig.baseColor,
  },
});
