import { StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';
import AppConfig from '../../core/utils/app_config';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: AppConfig.baseColor,
  },
  container: {
    backgroundColor: AppConfig.baseColor,
    alignItems: 'center',
  },
  backIcon: {
    margin: AppConfig.paddingL,
  },
  profileImage: {
    marginTop: ms(10),
    marginBottom: ms(20),
    height: ms(180),
    width: ms(180),
    borderRadius: ms(100),
  },
  formContainer: {
    alignItems: 'center',
    marginBottom: ms(20),
  },
  labelInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelInputImage: {
    marginVertical: ms(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelInputButton: {
    marginLeft: ms(16),
  },
  inputBar: {
    width: ms(280),
    borderWidth: ms(1),
    borderRadius: ms(8),
    padding: AppConfig.paddingL,
  },
  profileName: {
    fontSize: AppConfig.heading2Size,
    fontWeight: '500',
  },
  profileEmail: {
    marginVertical: AppConfig.paddingS,
  },
});
