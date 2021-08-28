import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  FlatList,
  Alert,
} from 'react-native';
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
    <View style={styles.screen}>
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
              category_name={item.category_name}
              category_image={item.category_image}
              category_count={item.category_count}
            />
          )}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
