import { StyleSheet } from 'react-native';
import AppConfig from '../../core/utils/app_config';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppConfig.baseColor,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
