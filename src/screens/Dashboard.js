import React, {useEffect, useState} from 'react';
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
import {ViewMore, BookNow} from './../components/button/GeneralButton';
import ServiceCard from './../components/cards/ServiceCard';
import {home as homeAPI} from '../services/api';
import {BASE_URL} from './../utils/global/';


const Dashboard = ({navigation}) => {
  const [loading, setLaoding] = useState(false);
  const [dasboardData, setDashboardData] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [popularServices, setPopularServices] = useState([]);
  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLaoding(true);
    let formData = new URLSearchParams({
      latitude: 11.057152556557286,
      longitude: 77.29133561253548,
    });
    let response = await homeAPI(formData);
    setCategoryList(response.data.data.category_list);
    setPopularServices(response.data.data.popular_services);
    console.log(response.data.data.popular_services)
    setLaoding(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={{...styles.h1, color: '#fff'}}>Dashboard</Text>
        <TouchableOpacity
        onPress={() => navigation.navigate('Notifications')}>
          <Image
            source={require('./../assets/icons/bell.png')}
            style={{width: 25, height: 25, tintColor: '#fff'}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bodyContainer}>
        <View style={{...styles.rowCont, ...styles.search}}>
          <TextInput
            style={{flex: 1, color:'#000'}}
            value={searchKey}
            onChangeText={setSearchKey}
            placeholder="Search Service"
            placeholderTextColor="#a1a1a1"
          />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('FindAProfessional', {
                searchKey: searchKey,
              })
            }>
            <Image
              source={require('./../assets/icons/search.png')}
              style={{width: 25, height: 25}}
            />
          </TouchableOpacity>
        </View>                         

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapper}>
            <Swiper style={{borderRadius:10}} showsButtons={false} autoplay={true}>
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

            <LinearGradient
              pointerEvents={'none'}
              start={{x: 0, y: 0}}
              end={{x: 0.8, y: 0}}
              colors={['transparent', 'transparent', '#000']}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: 'transparent',
              }}></LinearGradient>

            <View
              style={{
                position: 'absolute',
                top: 0,
                right: 20,
                bottom: 0,
                justifyContent: 'center',
              }}>
              <Text style={{...styles.h1, color: '#fff'}}>Best Service</Text>
              <Text style={{...styles.h1, color: '#fff'}}>Provider</Text>
              <BookNow />
            </View>
          </View>

          <View style={{marginBottom: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <Text style={styles.h2}>Categories</Text>
              <ViewMore onPress={() => navigation.navigate('CategoriesStack')} />
            </View>

            {loading ? (
              <ActivityIndicator color={COLORS.PRIMARY} />
            ) : (
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{marginVertical: 5}}>
                {categoryList.map((item, i) => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ServicesList', { categoryID: item.id })}
                    key={i}
                    style={{alignItems: 'center', marginRight: 32}}>
                    <View style={styles.iconCont}>
                      <Image
                        source={{uri: `${BASE_URL}${item.category_image}`}}
                        style={{width: 60, height: 60, borderRadius: 100}}
                        PlaceholderContent={<ActivityIndicator />}
                      />
                    </View>
                    <Text
                      style={{
                        ...styles.h3,
                        width: 60,
                        marginTop: 5,
                        textAlign: 'center',
                      }}>
                      {item.category_name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text style={styles.h2}>Popular Services</Text>
          </View>

          {loading ? (
            <ActivityIndicator color={COLORS.PRIMARY} />
          ) : (
            popularServices.map((item, i) => (
              <ServiceCard
                key={i}
                service_id={item.service_id}
                service_title={item.service_title}
                image={item.service_image}
                currency={item.currency_code}
                service_amount={item.service_amount}
                ratings={item.ratings}
              />
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
  },
  headerBar: {
    height: 50,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bodyContainer: {
    flex: 0.94,
    backgroundColor: '#fff',
    marginTop: 'auto',
    paddingHorizontal: 10,
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
  search: {
    position: 'absolute',
    width: '100%',
    height: 50,
    top: -25,
    paddingHorizontal: 10,
    zIndex: 1,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 8,
  },
  image: {
    borderRadius: 10,
  },
  iconCont: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5FFFC',
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  wrapper: {
    marginTop: 40,
    height: 150,
    borderRadius: 10,
    zIndex: 1,
    marginBottom: 10,
    borderRadius: 10,
  },
});
