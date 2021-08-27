import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {BASE_URL} from './../../utils/global';

const CategoriesCard = ({category_name, category_image, category_count}) => {
  return (
    <View style={styles.card}>
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
    </View>
  );
};

export default CategoriesCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
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
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  h1: {
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  h2:{
      fontWeight:'bold',
      color:'#333',
      fontSize:12,
      marginLeft:5
  },
  count:{
      position:'absolute',
      top:5,
      right:5,
      backgroundColor:'#fff',
      paddingHorizontal:5,
      borderRadius:10,
      flexDirection:'row',
      alignItems:'center'
  }
});
