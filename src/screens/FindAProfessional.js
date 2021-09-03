import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import CategoriesPicker from './../components/picker/CategoriesPicker';
import {COLORS} from './../utils/theme';
import Slider from '@react-native-community/slider';
import {CustomInputWithTitle} from './../components/input/CustomInput';
import ServiceCard from './../components/cards/ServiceCard';
import {categoryList, searchService as searchServiceAPI} from '../services/api';

const FindAProfessional = ({route, navigation}) => {
  const {searchKey} = route.params;

  const [searchresultData, setSearchResultData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState(searchKey);
  const [sortBy, setSortBy] = useState('');
  const [Categories, setCategories] = useState({category_name: 'All'});
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');

  useEffect(() => {
      searchHandler();
  }, []);

  const searchHandler = async () => {
    setLoading(true);
    let formdata = new URLSearchParams({
      text: searchText,
     
    });
    const response = await searchServiceAPI(formdata);
    if (response.data.response.response_code == 200) {
      setSearchResultData(response.data.data);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={{...styles.h1, color: '#fff', marginLeft: 10}}>
          Search Service
        </Text>
      </View>
      <View style={styles.bodyContainer}>
        <View
          style={{
            position: 'absolute',
            top: -30,
            left: 0,
            right: 0,
            height: '100%',
          }}>
          <ScrollView
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{zIndex: 1}}>
            <View style={styles.filterOptionsCont}>
              <View
                style={{
                  marginBottom: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderColor: COLORS.PRIMARY,
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                }}>
                <TextInput
                  style={{flex: 1}}
                  value={searchText}
                  onChangeText={setSearchText}
                  placeholder="Search Service"
                />

                <TouchableOpacity onPress={searchHandler}>
                  <Image
                    source={require('./../assets/icons/search.png')}
                    style={{width: 25, height: 25}}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  ...styles.rowCont,
                  justifyContent: 'space-between',
                  marginBottom: 5,
                }}>
                <View style={{width: '49%'}}>
                  <CustomInputWithTitle
                    title={'Short By'}
                    placeholder={'Price low to high'}
                  />
                </View>

                <View style={{width: '49%'}}>
                  <CategoriesPicker
                    title={'Categories'}
                    value={Categories}
                    onSelect={setCategories}
                  />
                </View>
              </View>

              <View style={{marginBottom: 5}}>
                <CustomInputWithTitle
                  title={'Location'}
                  placeholder={'Enter location'}
                />
              </View>

              <View style={{height: 70}}>
                <Text style={{...styles.h3, color: '#000'}}>Price Range</Text>
                <Slider
                  style={{flex: 1, height: 10}}
                  minimumValue={0}
                  maximumValue={1}
                  minimumTrackTintColor={COLORS.PRIMARY}
                  maximumTrackTintColor="#000000"
                />
                <Text style={styles.h2}>$100</Text>
              </View>
            </View>

            <View style={{backgroundColor: '#fff', zIndex: 1}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: 10,
                }}>
                <Text style={styles.h2}>Search results</Text>
              </View>

              {loading ? (
                <ActivityIndicator color={COLORS.PRIMARY} />
              ) : (
                searchresultData.map((item, i) => (
                  <View key={i} style={{paddingHorizontal: 10}}>
                    <ServiceCard
                      location={item.service_location}
                      image={item.service_image}
                      service_title={item.service_title}
                      service_amount={item.service_amount}
                      currency={item.currency}
                    />
                  </View>
                ))
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default FindAProfessional;

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
  filterOptionsCont: {
    padding: 10,
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
    marginTop: 30,
    height: 150,
    borderRadius: 10,
    zIndex: 1,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#a1a1a1',
  },
});
