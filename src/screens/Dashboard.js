import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
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
import SearchBar from '../components/search/SearchBar';
import EStyleSheet from 'react-native-extended-stylesheet';
import RootScreen from '../components/molecules/rootScreen/RootScreen';
import {FlatList} from 'react-native-gesture-handler';
import CustomHeader from '../components/molecules/header/CustomHeader';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
    setLaoding(false);
  };

  const _imageSwiper = () => (
    <View style={styles.wrapper}>
      <Swiper style={styles.swiper} showsButtons={false} autoplay={true}>
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
        style={styles.gradient}></LinearGradient>

      <View style={styles.swiper_text}>
        <Text style={{...styles.h1}}>Best Service</Text>
        <Text style={{...styles.h1}}>Provider</Text>
        <BookNow />
      </View>
    </View>
  );

  const _renderPopularServices = ({item}) => (
    <ServiceCard
      service_id={item.service_id}
      service_title={item.service_title}
      image={item.service_image}
      mobileno={item.mobileno}
      currency={item.currency_code}
      service_amount={item.service_amount}
      ratings={item.ratings}
    />
  );

  const _handleRenderHeader = ({item}) => (
    <>
      {_imageSwiper()}
      <View style={styles.flatlist}>
        <View style={styles.categories}>
          <Text style={styles.h2}>Categories</Text>
          <ViewMore onPress={() => navigation.navigate('CategoriesStack')} />
        </View>

        {loading ? (
          <ActivityIndicator color={EStyleSheet.value('$PRIMARY')} />
        ) : (
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollview}>
            {categoryList.map((item, i) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ServicesList', {categoryID: item.id})
                }
                key={i}
                style={styles.service_list}>
                <View style={styles.iconCont}>
                  <Image
                    source={{uri: `${BASE_URL}${item.category_image}`}}
                    style={styles.category_image}
                    PlaceholderContent={<ActivityIndicator />}
                  />
                </View>
                <Text
                  style={{
                    ...styles.h3,
                  }}>
                  {item.category_name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
      <View style={styles.services}>
        <Text style={styles.h2}>Popular Services</Text>
      </View>
    </>
  );

  const _renderFooter = () => (
    <ActivityIndicator color={EStyleSheet.value('$PRIMARY')} />
  );

  const HeaderLeft = ({showNav, title}) => {
    return (
      <Image
        style={{height: 32, width: 92}}
        source={require('./../assets/images/logo.png')}
      />
    );
  };

  const HeaderRight = ({showNav, title}) => {
    const handleIconPress = () => navigation.navigate('Notifications');
    return (
      <Icon
        name="notifications"
        size={30}
        color={EStyleSheet.value('$WHITE')}
        onPress={handleIconPress}
        //  style={styles.navButton}
      />
    );
  };

  return (
    <RootScreen
      headerComponent={() => (
        <CustomHeader
          headerLeft={<HeaderLeft />}
          headerRight={<HeaderRight />}
          showNav={false}
        />
      )}>
      <SearchBar value={searchKey} onChangeText={setSearchKey} />
      <FlatList
        data={popularServices}
        ListHeaderComponent={_handleRenderHeader}
        renderItem={_renderPopularServices}
        keyExtractor={item => item.id}
      />
    </RootScreen>
  );
};

export default Dashboard;

const styles = EStyleSheet.create({
  bodyContainer: {
    backgroundColor: 'transparent',
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  swiper: {
    borderRadius: 10,
  },
  flatlist: {
    marginBottom: 10,
  },
  service_list: {
    alignItems: 'center',
    marginRight: 32,
  },
  swiper_text: {
    position: 'absolute',
    top: 0,
    right: 20,
    bottom: 0,
    justifyContent: 'center',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  category_image: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  scrollview: {
    marginVertical: 5,
  },
  h1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '$HEADER',
  },
  h2: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '$TEXT',
  },
  h3: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '$TEXT',
    width: 60,
    marginTop: 5,
    textAlign: 'center',
  },
  rowCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  services: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
  iconNotification: {
    width: 25,
    height: 25,
    tintColor: '#fff',
  },
  wrapper: {
    marginTop: 60,
    height: 150,
    borderRadius: 10,
    zIndex: 1,
    marginBottom: 10,
    borderRadius: 10,
  },
});
