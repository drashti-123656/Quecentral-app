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
import {useDispatch, useSelector} from 'react-redux';
import {serviceDetailsAction} from '../redux/actions/serviceDetails';
import NoResultFound from '../components/molecules/NoResultFound';
import Config from 'react-native-config';

const ServiceDetails = props => {
  const {serviceId} = props.route.params;
  const dispatch = useDispatch();

  const {
    serviceOverview,
    sellerOverview,
    availableDays,
    reviews,
    isFetching,
    error,
  } = useSelector(({serviceDetails}) => serviceDetails);
  const [displaySection, setDisplaySection] = useState('overview');

  useEffect(async () => {
    let MD5ServiceId = MD5(serviceId).toString();
    const payload = {id: MD5ServiceId};
    dispatch(serviceDetailsAction(payload));
  }, []);

  // const fetchServiceDetails = async () => {
  //   try {
  //     setLoading(true);
  //     let MD5ServiceId = MD5(serviceId);
  //     const {data} = await serviceDetailsAPI(MD5ServiceId);
  //     setServiceOverview(data.data.service_overview);
  //     setSellerOverview(data.data.sellerOverview);
  //     setAvailabilityDays(data.data.availability_days);
  //     setReviews(data.data.reviews);

  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //   }
  // };

  const HeaderNav = sectionName => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View>
        <TouchableOpacity
          onPress={() => _handleViewSection('overview')}
          style={styles.serviceAvailability}>
          <Text style={styles.text}>OverView</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => _handleViewSection('availablity')}
          style={styles.serviceAvailability}>
          <Text style={styles.text}>Availablity</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          onPress={() => _handleViewSection('serviceOffered')}
          style={styles.serviceAvailability}>
          <Text style={styles.text}>Reviews</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const _handleRenderFooter = () => (
    <>
      {isFetching ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator color={COLORS.PRIMARY} size={'large'} />
        </View>
      ) : null}
    </>
  );

  const _handleViewSection = sectionName => {
    setDisplaySection(sectionName);
  };

  const _handleRenderAvailableDays = ({item}) => {
    return (
      <View style={styles.availabilityContainer}>
        <View style={styles.leaveContainer}>
          <Text>
            <Text style={styles.titleText}>Day:</Text> {item.day}
          </Text>
          <Text>
            <Text style={styles.titleText}>From_Date::</Text> {item.from_time}
          </Text>
          <Text>
            <Text style={styles.titleText}>To_Date:</Text> {item.to_time}
          </Text>
        </View>
      </View>
    );
  };

  const _handleEmptyComponentRender = () => <NoResultFound />;

  const _handleRenderReviews = ({item}) => {
    return (
      <View style={styles.availabilityContainer}>
         <View>
          <Image
            source={{uri: `${Config.BASE_URL}/${item.profile_img}`}}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.reviewContainer}>
          <Text style={styles.reviewText}>Name: {item.name}</Text>
          <Text style={styles.reviewText}>Created: {item.created}</Text>
          <Text style={styles.reviewText}>Rating :{item.rating}</Text>
          <Text style={styles.reviewText}>Review: {item.review}</Text>
        </View>
      </View>
    );
  };

  return (
    <RootScreen
      headerComponent={() => <CustomHeader title={'Service Details'} />}>
      <HeaderNav />
      <View style={styles.bodyContainer}>
        {Object.keys(sellerOverview).length === 0 ? (
          isFetching ? (
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
                  name={sellerOverview.name}
                  image={sellerOverview.profile_img}
                  email={sellerOverview.email}
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
                data={availableDays}
                renderItem={_handleRenderAvailableDays}
                keyExtractor={item => item.day}
                contentContainerStyle={styles.flatlistContainer}
                ListEmptyComponent={_handleEmptyComponentRender}
              />
            ) : (
              <FlatList
                data={reviews}
                renderItem={_handleRenderReviews}
                keyExtractor={item => item.day}
                contentContainerStyle={styles.flatlistContainer}
                ListEmptyComponent={_handleEmptyComponentRender}
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
  leaveContainer: {
    padding: 15,
    marginHorizontal: 40,
  },
  detailText: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  titleText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  reviewText: {
    marginHorizontal: 50,
    fontSize: 12,
    fontWeight: 'bold',
  },
  AvailabilityText: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '$PRIMARY',
    color: '#fff',
    width: '100%',
    height: '18%',
    borderRadius: 20,
    paddingHorizontal: 70,
    padding: 3,
  },
  leaveText: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '$PRIMARY',
    color: '#fff',
    width: '100%',
    height: '15%',
    borderRadius: 20,
    paddingHorizontal: 70,
    padding: 5,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    flexDirection: 'row',
  },
  avalabilitytime: {
    fontSize: 16,
    marginHorizontal: 40,
    padding: 10,
  },
  reviewContainer: {
    marginBottom: 20,
    marginHorizontal: 30,
    marginTop: -70,
  },
  serviceAvailability: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    backgroundColor: 'red',
    paddingHorizontal: 12,
    borderRadius: 20,
    elevation: 3,
    marginBottom: 20,
    fontSize: 20,
    backgroundColor: COLORS.PRIMARY,
  },
  serviceText: {
    fontSize: 15,
    paddingBottom: 20,

    fontWeight: 'bold',
    color: '#333',
    marginBottom: -5,
  },
  upperText: {
    fontSize: 25,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingBottom: 20,
  },
  prodetail: {
    marginTop: 30,
  },
  availabilityContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: 10,
    marginTop: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  h1: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
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
  flatlistContainer: {
    flex: 1,
  },
});
