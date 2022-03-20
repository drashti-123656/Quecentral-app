import {Dimensions, ScrollView, Text, View} from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import Svg, {Path} from 'react-native-svg';

const RootScreen = ({children, headerComponent}) => {
  return (
    <View style={EStyleSheet.flatten([styles.rootScreen])}>
      <View style={styles.headerContainer}>
        {headerComponent && headerComponent()}
        <Svg
          width={Dimensions.get('screen').width}
          viewBox="0 0 1440 320"
          style={styles.headerBar}>
          <Path
            fill={EStyleSheet.value('$PRIMARY')}
            d="M 0,0
              L 0,250
              Q 750,500 1500,250
              L 1500, 0
              Z"
          />
        </Svg>
      </View>

      <View style={styles.childrenContainer}>{children}</View>
    </View>
  );
};

export default RootScreen;

const styles = EStyleSheet.create({
  rootScreen: {
    flex: 1,
    backgroundColor: '$BACKGROUND',
  },
  headerContainer: {
    height: 70,
    backgroundColor: '$PRIMARY',
  },
  headerBar: {
    height: 120,
    padding: 10,
  },
  childrenContainer: {
    flex: 1,
    position: 'absolute',
    top: 60,
    left: 10,
    bottom: 0,
    right: 10,
  },
  title: {
    color: '$WHITE',
    marginVertical: 10,
    fontSize: 16,
    marginLeft: 20,
    fontWeight: 'bold',
  },
});
