import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {COLORS} from './../utils/theme';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import ProviderDetails from './../components/cards/ProviderDetails';
import Stars from './../components/review/Stars';

const ServiceDetails = () => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#72E5D8', '#41C8B1', '#16AE8F']}
      style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={{...styles.h1, color: '#fff', marginLeft: 10}}>
          Dashboard
        </Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.ImageWrapper}>
          <Swiper showsButtons={false}>
            <Image
              source={require('./../assets/images/home.png')}
              style={styles.image}
              PlaceholderContent={<ActivityIndicator />}
            />
            <Image
              source={require('./../assets/images/home.png')}
              style={styles.image}
              PlaceholderContent={<ActivityIndicator />}
            />
          </Swiper>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              padding: 10,
              marginTop: 230,
            }}>
            <View
              style={{
                ...styles.rowCont,
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <Text
                style={{
                  ...styles.h2,
                  color: '#000',
                  marginRight: 10,
                }}>
                Plumbing
              </Text>
              <Text
                style={{
                  ...styles.h3,
                  color: '#FEB300',
                  marginRight: 'auto',
                  borderWidth: 1,
                  padding: 5,
                  borderColor: '#FEB300',
                  borderRadius: 5,
                }}>
                pending
              </Text>
              <Text
                style={{
                  ...styles.h2,
                  color: COLORS.PRIMARY,
                }}>
                $150
              </Text>
            </View>
            <Stars />
          </View>

          <ProviderDetails />

          <View style={{margin: 10}}>
            <Text style={styles.h2}>Service Details</Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam
            </Text>
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default ServiceDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
  },
  headerBar: {
    height: 50,
    justifyContent: 'center',
  },
  bodyContainer: {
    flex: 0.94,
    backgroundColor: '#fff',
    marginTop: 'auto',
  },
  h1: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  h3: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  rowCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageWrapper: {
    position: 'absolute',
    width: '90%',
    height: 250,
    top: -25,
    marginHorizontal: 20,
    zIndex: 1,
  },
  image: {
    flex: 1,
  },
});
