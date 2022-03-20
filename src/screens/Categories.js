import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  FlatList,
  Alert,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import RootScreen from '../components/molecules/rootScreen/RootScreen';
import {COLORS} from '../utils/theme';
import CategoriesCard from './../components/cards/CategoriesCard';
import {categoryList} from './../services/api';

const Categories = () => {
  const [categoryListData, setCategoryListData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    const response = await categoryList();
    if (response.data.response.response_code == 200) {
      setCategoryListData(response.data.data.category_list);
    } else {
      Alert.alert('Oops', 'There is network issue');
    }
    setLoading(false);
  };

  return (
    <RootScreen >
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={COLORS.PRIMARY} size={'large'} />
        </View>
      ) : (
        <FlatList
          numColumns={2}
          contentContainerStyle={{
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          data={categoryListData}
          renderItem={({item}) => (
            <CategoriesCard
              id={item.id}
              category_name={item.category_name}
              category_image={item.category_image}
              category_count={item.category_count}
            />
          )}
          ItemSeparatorComponent={
            () => <View style={{ width: 16, backgroundColor: 'pink' }}/>
        }
          keyExtractor={item => item.id}
        />
      )}
    </RootScreen>
  );
};

export default Categories;

const styles = EStyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '$BACKGROUND',
  },
});
