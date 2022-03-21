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
import MD5 from 'crypto-js/md5';
import {COLORS} from './../utils/theme';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import ProviderDetails from './../components/cards/ProviderDetails';
import Stars from './../components/review/Stars';
import {serviceDetails as serviceDetailsAPI} from './../services/api';
import {BASE_URL} from './../utils/global';
import EStyleSheet from 'react-native-extended-stylesheet';
import RootScreen from '../components/molecules/rootScreen/RootScreen';
import CustomHeader from '../components/molecules/header/CustomHeader';

const ServiceDetails = props => {
  const {serviceId} = props.route.params;

  const [loading, setLoading] = useState(false);
  const [serviceOverview, setServiceOverview] = useState({});
  const [seller_overview, setSellerOverview] = useState({});

  useEffect(() => {
    fetchServiceDetails();
  }, []);

  const fetchServiceDetails = async () => {
    setLoading(true);
    let MD5ServiceId = MD5(serviceId);
    console.log(serviceId);
    const response = await serviceDetailsAPI(MD5ServiceId);
    if (response.data.response.response_code == 200) {
      setServiceOverview(response.data.data.service_overview);
      setSellerOverview(response.data.data.seller_overview);
      console.log(response);
    }
    setLoading(false);
  };

  return (
    <RootScreen  headerComponent={() => <CustomHeader title={'Service Details'}  />}>
      <View style={styles.bodyContainer}>
        {Object.keys(serviceOverview).length === 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 100,
            }}>
            <Image
              source={require('./../assets/icons/exclamation.png')}
              style={{width: 60, height: 60, margin: 30}}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              Service Close
            </Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.ImageWrapper}>
              <Swiper showsButtons={false} autoplay={true}>
                {serviceOverview.service_image.map((item, i) => (
                  <Image
                    key={i}
                    source={{uri: `${BASE_URL}${item}`}}
                    style={styles.image}
                    PlaceholderContent={<ActivityIndicator />}
                  />
                ))}
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

                <Text
                  style={{
                    ...styles.h2,
                    color: COLORS.PRIMARY,
                  }}>
                  {`${serviceOverview.currency}${serviceOverview.service_amount}`}
                </Text>
              </View>

              <View
                style={{
                  ...styles.rowCont,
                  justifyContent: 'space-between',
                }}>
                <Stars rating={serviceOverview.ratings} />

                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('BookService', {
                      service_amount: serviceOverview.service_amount,
                      serviceId,
                    })
                  }
                  style={{
                    padding: 5,
                    backgroundColor: COLORS.PRIMARY,
                    width: 120,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      ...styles.h2,
                      textAlign: 'center',
                      color: '#fff',
                    }}>
                    Book Service
                  </Text>
                </TouchableOpacity>
              </View>
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
                backgroundColor: EStyleSheet.value('$CARD_BACKGROUND'),
                borderRadius: 10,
                marginBottom: 120,
              }}>
              <Text style={styles.h2}>Service Details</Text>
              <Text style={styles.h4}>{serviceOverview.about}</Text>
            </View>
          </ScrollView>
        )}
      </View>
    </RootScreen>
  );
};

export default ServiceDetails;

const styles = EStyleSheet.create({
  bodyContainer: {
    flex: 0.94,
    backgroundColor: 'transparent',
  },
  h1: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '$TEXT',
  },
  h3: {
    fontSize: 12,
    fontWeight: 'bold',
    //color: '$TEXT',
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
  h4: {
    color: '$TEXT',
    padding: 5,
  },
});
