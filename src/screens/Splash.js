import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
  Appearance,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {COLORS} from './../utils/theme';

const colorScheme = Appearance.getColorScheme();
const Splash = () => {
  return (
    <View style={styles.container}>
      <Image
        source={
          colorScheme === 'light'
            ? require('./../assets/images/splashLight.png')
            : require('./../assets/images/splashDark.png')
        }
        style={styles.SplashImage}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          width: '100%',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" color={EStyleSheet.value('$TEXT')} />
      </View>
    </View>
  );
};

export default Splash;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },

  SplashImage: {
    flex: 1,
    width: Dimensions.get('window').width,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
