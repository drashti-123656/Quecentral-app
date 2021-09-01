import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import MD5 from "crypto-js/md5";
import {COLORS} from './../utils/theme';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import ProviderDetails from './../components/cards/ProviderDetails';
import Stars from './../components/review/Stars';
import {serviceDetails as serviceDetailsAPI} from './../services/api';

const ServiceDetails = props => {
  const { serviceId } = props.route.params;

  const [loading, setLoading] = useState(false);
  const [serviceOverview, setServiceOverview] = useState({});
  const [seller_overview, setSellerOverview] = useState({});

  useEffect(() => {
    fetchServiceDetails();
  }, []);

  const fetchServiceDetails = async () => {
    setLoading(true);
    let MD5ServiceId =  MD5(serviceId)
    console.log(serviceId)
    const response = await serviceDetailsAPI(MD5ServiceId);
    if (response.data.response.response_code == 200) {
      setServiceOverview(response.data.data.service_overview);
      setSellerOverview(response.data.data.seller_overview);
      console.log(response.data.data.service_overview)
    }
    setLoading(false);
  };

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#72E5D8', '#41C8B1', '#16AE8F']}
      style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={{...styles.h1, color: '#fff', marginLeft: 10}}>
          Service Details
        </Text>
      </View>
      <View style={styles.bodyContainer}>
        {loading ? (
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <ActivityIndicator color={COLORS.PRIMARY} size={'large'} />
          </View>
        ) : (
          <View
            style={{
              position: 'absolute',
              top: -30,
              left: 10,
              right: 10,
              height: Dimensions.get('window').height,
            }}>
            <ScrollView showsVerticalScrollIndicator={false}>
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
                    {serviceOverview.service_title}
                  </Text>
                  {/* <Text
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
              </Text> */}
                  <Text
                    style={{
                      ...styles.h2,
                      color: COLORS.PRIMARY,
                    }}>
                    {`${serviceOverview.currency}${serviceOverview.service_amount}`}
                  </Text>
                </View>
                <Stars rating={0} />
              </View>

              <ProviderDetails
                style={{marginBottom: 10}}
                name={seller_overview.name}
                image={seller_overview.profile_img}
                mobileno={seller_overview.mobileno}
                email={seller_overview.email}
              />

              <View
                style={{
                  padding: 10,
                  margin: 10,
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  marginBottom: 120,
                }}>
                <Text style={styles.h2}>Service Details</Text>
                <Text>{serviceOverview.about}</Text>
              </View>
            </ScrollView>
          </View>
        )}
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
    backgroundColor: '#f1f1f1',
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
