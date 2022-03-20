import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {BASE_URL} from './../../utils/global';
import { useNavigation } from '@react-navigation/native';
import EStyleSheet from 'react-native-extended-stylesheet';

const CategoriesCard = ({id, category_name, category_image, category_count}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
    onPress={() => navigation.navigate('ServicesList', { categoryID: id })}
     style={styles.card}>
      <View>
        <Image
          source={{uri: `${BASE_URL}${category_image}`}}
          style={styles.serviceImage}
        />
        <View style={styles.count}>
        <Image
          source={require('./../../assets/icons/stack.png')}
          style={{width:10, height:10}}
        />
          <Text style={styles.h2}>{category_count}</Text>
        </View>
      </View>
      <Text style={styles.h1}>{category_name}</Text>
    </TouchableOpacity>
  );
};

export default CategoriesCard;

const styles = EStyleSheet.create({
  card: {
    backgroundColor: '$CARD_BACKGROUND',
    padding: 10,
    borderRadius: 10,
    shadowColor: '$ALPHA_PRIMARY',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 5,
    marginHorizontal: 5,
  },
  serviceImage: {
    width: 140,
    height: 140,
    borderRadius: 10,
    marginBottom: 10,
  },
  h1: {
    color: '$TEXT',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  h2:{
      fontWeight:'bold',
      color:'$BLACK',
      fontSize:12,
      marginLeft:5
  },
  count:{
      position:'absolute',
      top:5,
      right:5,
      backgroundColor:'$GRAY_LIGHT',
      paddingHorizontal:5,
      borderRadius:10,
      flexDirection:'row',
      alignItems:'center'
  }
});
