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
import {FlatList} from 'react-native-gesture-handler';

const ServiceDetails = props => {
  const {serviceId} = props.route.params;

  const [loading, setLoading] = useState(false);
  const [serviceOverview, setServiceOverview] = useState({});
  const [seller_overview, setSellerOverview] = useState({});
  const [availableDays, setAvailabilityDays] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [displaySection, setDisplaySection] = useState('overview');

  useEffect(() => {
    fetchServiceDetails();
  }, []);

  const fetchServiceDetails = async () => {
    try {
      setLoading(true);
      let MD5ServiceId = MD5(serviceId);
      const {data} = await serviceDetailsAPI(MD5ServiceId);
      console.log('data', data);
      setServiceOverview(data.data.service_overview);
      setSellerOverview(data.data.seller_overview);
      setAvailabilityDays(data.data.availability_days);
      setReviews(data.data.reviews);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const _handleRenderFooter = () => (
    <>
      {loading ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator color={COLORS.PRIMARY} size={'large'} />
        </View>
      ) : null}
    </>
  );

  const HeaderNav = sectionName => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View>
        <TouchableOpacity onPress={() => _handleViewSection('overview')}>
          <Text>OverView</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => _handleViewSection('availablity')}>
          <Text>Availablity</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity onPress={() => _handleViewSection('serviceOffered')}>
          <Text>Reviews</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const _handleViewSection = sectionName => {
    setDisplaySection(sectionName);
  };

  const _handleRenderAvailableDays = ({item}) => (
    <Text style={{color: EStyleSheet.value('$BLACK')}}>sjadjs</Text>
  );

  return (
    <RootScreen
      headerComponent={() => <CustomHeader title={'Service Details'} />}>
      <HeaderNav />
      <View style={styles.bodyContainer}>
        {Object.keys(serviceOverview).length === 0 ? (
          loading ? (
            _handleRenderFooter()
          ) : (
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
          )
        ) : (
          <>
            {console.log('availableDays', availableDays)}
            {displaySection === 'overview' ? (
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
                        color: EStyleSheet.value('$TEXT'),
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
            ) : displaySection === 'availablity' ? (
              <FlatList
                data={JSON.parse(availableDays)}
                renderItem={_handleRenderAvailableDays}
                keyExtractor={item => item.day}
              />
            ) : (
              <FlatList
                data={reviews}
                renderItem={({item}) => (
                  <Text style={{color: EStyleSheet.value('$BLACK')}}>
                    sjadjs
                  </Text>
                )}
                keyExtractor={item => item.day}
              />
            )}
          </>
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
