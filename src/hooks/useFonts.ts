import * as Font from 'expo-font';

export const useFonts = async () => {
    await Font.loadAsync({
        'Gilroy-Bold': require('../../assets/fonts/Gilroy-Bold.ttf'),
        'Gilroy-SemiBold': require('../../assets/fonts/Gilroy-SemiBold.ttf'),
        'Gilroy-Regular': require('../../assets/fonts/Gilroy-Regular.ttf'),
    });
};