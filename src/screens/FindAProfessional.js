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
  Dimensions,
  Button,
  Pressable
} from 'react-native';
import CategoriesPicker from './../components/picker/CategoriesPicker';
import Picker from './../components/picker/Picker';
import {COLORS} from './../utils/theme';
import {CustomInputWithTitle} from './../components/input/CustomInput';
import ServiceCard from './../components/cards/ServiceCard';
import {categoryList, searchService as searchServiceAPI} from '../services/api';
import NoResultFound from './../components/molecules/NoResultFound';
import DropDownPicker from 'react-native-dropdown-picker';

import SliderScreen from './../components/Slider/Slider';

const FindAProfessional = ({route, navigation}) => {

  const [searchresultData, setSearchResultData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState({id: 0, value: ''});
  const [Categories, setCategories] = useState({category_name: 'All'});
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50);
  const [shouldShow, setShouldShow] = useState(false);
  useEffect(() => {
    searchHandler();
  }, [Categories, sortBy, searchText, minPrice, maxPrice]);

  const searchHandler = async () => {
    setLoading(true);
    let data = {min_price: minPrice, max_price: maxPrice, sort_by: sortBy.id};
    if(searchText !== ''){
      data.text = searchText
    }
    if(Categories !== undefined){
      data.category = Categories.id
    }

    let formdata = new URLSearchParams(data);

    console.log(data);
    const response = await searchServiceAPI(formdata);
    if (response.data.response.response_code == 200) {
      setSearchResultData(response.data.data);
    }
    setLoading(false);
  };

  return (
    <><View style={styles.container}>
        <View style={styles.headerBar}>
          <Text style={{ ...styles.h1, color: '#fff', marginLeft: 10 }}>
            Search Service
          </Text>
        </View>
        
        <View style={styles.bodyContainer}>
          <View
            style={styles.mainContainer}>
            <ScrollView
              showsVerticalScrollIndicator={true}
              contentContainerStyle={{ zIndex: 1 }}>
              <View style={styles.filterOptionsCont}>
             
                <View
                  style={styles.searchDevice}>
                  <TextInput
                    style={styles.searchTitle}
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholder="Search Service"
                    placeholderTextColor="#a1a1a1" />

                  <TouchableOpacity onPress={searchHandler}>
                    <Image
                      source={require('./../assets/icons/search.png')}
                      style={styles.serchIcon} />
                  </TouchableOpacity>
                </View>
                <View style={styles.locationTitle}>
                  <CustomInputWithTitle
                    title={'Location'}
                    placeholder={'Enter location'} />
                </View>
                <Pressable style={styles.openButton} onPress={() => setShouldShow(!shouldShow)}>
      <Text  style={styles.text}>OPEN</Text>
    </Pressable>
                
                <View
                  style={{
                    ...styles.rowCont,
                    justifyContent: 'space-between',
                    marginBottom: 5,
                    marginTop:15
                  }}>
                    
                  <View style={styles.sortbyTitle}>
                  {shouldShow ? (
                    <Picker
                      title={'Sort By'}
                      value={sortBy}
                      data={[
                        { id: 1, value: 'Price low to high' },
                        { id: 2, value: 'Price high to low' },
                        { id: 3, value: 'Newest' },
                      ]}
                      onSelect={setSortBy} />
                      )  : null}
                  
                  </View>

                  <View style={styles.sortbyTitle}>
                  {shouldShow ? (
                    <CategoriesPicker
                      title={'Categories'}
                      value={Categories}
                      onSelect={setCategories} />
                      )  : null}
                  </View>
                  
                </View>



                <View>
                {shouldShow ? (
                  <><Text style={{ ...styles.h3, color: '#000', marginBottom: 10 }}>
                    Price Range
                  </Text><SliderScreen
                      setMinPrice={setMinPrice}
                      setMaxPrice={setMaxPrice} /><Text
                        style={{
                          ...styles.h2,
                          marginTop: 10,
                        }}>{`\u20B9 ${minPrice} -  \u20B9 ${maxPrice}`}</Text></>
                    )  : null}
                </View>
            
              </View>

              <View style={styles.searchContainer}>
                <View
                  style={styles.searchResutcontainer}>
                  <Text style={styles.h2}>Search results</Text>
                </View>

                {loading ? (
                  <ActivityIndicator color={COLORS.PRIMARY} />
                ) : (
                  <View>
                    {searchresultData.length == 0 && <NoResultFound />}
                    {searchresultData.map((item, i) => (
                      <View key={i} style={styles.serviceCard}>
                        <ServiceCard
                          service_id={item.service_id}
                          location={item.service_location}
                          image={item.service_image}
                          service_title={item.service_title}
                          mobileno={item.mobileno}
                          service_amount={item.service_amount}
                          currency={item.currency} />
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </View></>
  );
};

export default FindAProfessional;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
  },

  mainContainer:{
    position: 'absolute',
    top: -30,
    left: 0,
    right: 0,
    height: Dimensions.get('window').height - 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
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
  openButton:{
alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginHorizontal:125,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: COLORS.PRIMARY,
    width:'30%',
    marginTop:20
  },
  h1: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchResutcontainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
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
  serviceCard:{paddingHorizontal: 10},
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
  serchIcon:{width: 25, height: 25},
  searchDevice:{
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.PRIMARY,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchTitle:{flex: 1, color: '#000'},
  locationTitle:{marginBottom: 5},
  sortbyTitle:{width: '49%'},
  searchContainer:{backgroundColor: '#fff', zIndex: 1}
});
