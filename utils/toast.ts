import Toast from 'react-native-toast-message';

export const showToast = (message: string, type: string) => {
  Toast.show({
    type: type,
    text1: message,
    position: 'bottom',
    visibilityTime: 1500,
  });
};
