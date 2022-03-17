import React, {useState, useEffect, useRef} from 'react';
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
  FlatList,
  Pressable,
} from 'react-native';
import CategoriesPicker from './../components/picker/CategoriesPicker';
import Picker from './../components/picker/Picker';
import {COLORS} from './../utils/theme';
import {CustomInputWithTitle} from './../components/input/CustomInput';
import ServiceCard from './../components/cards/ServiceCard';
import NoResultFound from './../components/molecules/NoResultFound';
import Icon from 'react-native-vector-icons/FontAwesome5';

import SliderScreen from './../components/Slider/Slider';
import {useDispatch, useSelector} from 'react-redux';
import {searchServiceAction} from '../redux/actions/searchSevice';
import EStyleSheet from 'react-native-extended-stylesheet';

const FindAProfessional = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {services, isFetching} = useSelector(
    ({searchServices}) => searchServices,
  );

  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState({id: 0, value: ''});
  const [Categories, setCategories] = useState({category_name: 'All'});
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50);
  const [ShowAdvanceFilters, setShowAdvanceFilters] = useState(false);
  const searchInput = useRef(null);

  useEffect(() => {
    searchHandler();
  }, [Categories, sortBy, searchText, minPrice, maxPrice]);

  useEffect(() => {
    searchInput.current.focus();
  }, []);

  const searchHandler = async () => {
    let data = {
      min_price: minPrice,
      max_price: maxPrice,
      sort_by: sortBy.id,
    };
    if (searchText !== '') {
      data.text = searchText;
    }
    if (Categories !== undefined) {
      data.category = Categories.id;
    }

    let formdata = new URLSearchParams(data);

    dispatch(searchServiceAction(data));
  };

  const _handleRenderSearchResults = ({item}) => (
    <View style={styles.serviceCard}>
      <ServiceCard
        service_id={item.service_id}
        location={item.service_location}
        image={item.service_image}
        service_title={item.service_title}
        mobileno={item.mobileno}
        service_amount={item.service_amount}
        currency={item.currency}
      />
    </View>
  );
  const _handleRenderFooter = () =>
    isFetching && (
      <ActivityIndicator
        color={EStyleSheet.value('$PRIMARY')}
        size={'small'}
        style={styles.loader}
      />
    );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerBar}>
          <Text style={{...styles.h1, color: '#fff', marginLeft: 10}}>
            Search Service
          </Text>
        </View>

        <View style={styles.bodyContainer}>
          <View style={styles.mainContainer}>
            <ScrollView
              showsVerticalScrollIndicator={true}
              contentContainerStyle={{zIndex: 1}}>
              <View style={styles.filterOptionsCont}>
                <View style={styles.searchDevice}>
                  <TextInput
                    ref={searchInput}
                    style={styles.searchTitle}
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholder="Search Service"
                    placeholderTextColor="#a1a1a1"
                  />

                  <TouchableOpacity onPress={searchHandler}>
                    <Image
                      source={require('./../assets/icons/search.png')}
                      style={styles.serchIcon}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.locationTitle}>
                  <CustomInputWithTitle
                    title={'Location'}
                    placeholder={'Enter location'}
                  />
                </View>

                {ShowAdvanceFilters ? (
                  <View>
                    <View
                      style={{
                        ...styles.rowCont,
                        justifyContent: 'space-between',
                        marginBottom: 5,
                        marginTop: 15,
                      }}>
                      <View style={styles.sortbyTitle}>
                        <Picker
                          title={'Sort By'}
                          value={sortBy}
                          data={[
                            {id: 1, value: 'Price low to high'},
                            {id: 2, value: 'Price high to low'},
                            {id: 3, value: 'Newest'},
                          ]}
                          onSelect={setSortBy}
                        />
                      </View>

                      <View style={styles.sortbyTitle}>
                        <CategoriesPicker
                          title={'Categories'}
                          value={Categories}
                          onSelect={setCategories}
                        />
                      </View>
                    </View>

                    <Text
                      style={{...styles.h3, color:EStyleSheet.value('$TEXT'), marginBottom: 10}}>
                      Price Range
                    </Text>
                    <SliderScreen
                      setMinPrice={setMinPrice}
                      setMaxPrice={setMaxPrice}
                    />
                    <Text
                      style={{
                        ...styles.h2,
                        marginTop: 10,
                      }}>{`\u20B9 ${minPrice} -  \u20B9 ${maxPrice}`}</Text>
                  </View>
                ) : null}

                <Pressable
                  style={styles.moreFiltersButton}
                  onPress={() => setShowAdvanceFilters(!ShowAdvanceFilters)}>
                  <Icon
                    name={ShowAdvanceFilters ? 'angle-up' : 'angle-down'}
                    size={25}
                    color={EStyleSheet.value('$TEXT')}
                  />
                </Pressable>
              </View>

              <View style={styles.searchContainer}>
                <View style={styles.searchResutcontainer}>
                  <Text style={styles.h2}>Search results</Text>
                </View>

                <View>
                  <FlatList
                    data={services}
                    renderItem={_handleRenderSearchResults}
                    ListEmptyComponent={<NoResultFound />}
                    ListFooterComponent={_handleRenderFooter}
                    keyExtractor={item => item.id}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </>
  );
};

export default FindAProfessional;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$PRIMARY',
  },

  mainContainer: {
    position: 'absolute',
    top: -30,
    left: 0,
    right: 0,
    height: Dimensions.get('window').height - 20,
    backgroundColor: '$BACKGROUND',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '$TEXT',
  },
  headerBar: {
    height: 50,
    justifyContent: 'center',
  },
  bodyContainer: {
    flex: 0.94,
    backgroundColor: '$TEXT',
    marginTop: 'auto',
  },
  moreFiltersButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchResutcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  h2: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '$TEXT',
  },
  h3: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '$TEXT',
  },
  rowCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceCard: {paddingHorizontal: 10},
  filterOptionsCont: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: '$CARD_BACKGROUND',
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
  serchIcon: {width: 25, height: 25},
  searchDevice: {
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.PRIMARY,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchTitle: {flex: 1, color: '#000'},
  locationTitle: {marginBottom: 5},
  sortbyTitle: {width: '49%'},
  searchContainer: {backgroundColor: '$BACKGROUND', zIndex: 1},

  loader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
